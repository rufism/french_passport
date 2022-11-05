terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }
  }

  required_version = "~> 1.0"
}

provider "aws" {
  region = var.aws_region
}

resource "random_pet" "lambda_bucket_name" {
  prefix = "french-passport"
  length = 4
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = random_pet.lambda_bucket_name.id
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.lambda_bucket.id
  acl    = "private"
}

#
# create code artifact
#

data "archive_file" "lambda_french_passport" {
  type = "zip"

  source_dir  = "${path.module}/backend"
  output_path = "${path.module}/backend.zip"
}

resource "aws_s3_object" "Lambda_french_passport" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "backend.zip"
  source = data.archive_file.lambda_french_passport.output_path

  etag = filemd5(data.archive_file.lambda_french_passport.output_path)
}

#
# create lambda function
#

resource "aws_lambda_function" "french_passport" {
  function_name = "FrenchPassportMain"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.Lambda_french_passport.key

  runtime = "nodejs14.x"
  handler = "entrance.handler"

  source_code_hash = data.archive_file.lambda_french_passport.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "french_passport" {
  name = "/aws/lambda/${aws_lambda_function.french_passport.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  role = aws_iam_role.lambda_exec.name
  policy = jsonencode({
    Version: "2012-10-17",
    Statement:[
      {
        Effect: "Allow",
        Action: [
          "dynamodb:BatchGetItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchWriteItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ],
        Resource: aws_dynamodb_table.accounts_table.arn
      },
      {
        Effect: "Allow",
        Action: [
          "dynamodb:BatchGetItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchWriteItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ],
        Resource: aws_dynamodb_table.items_table.arn
      },
      {
        Effect: "Allow",
        Action: [
          "dynamodb:BatchGetItem",
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchWriteItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem"
        ],
        Resource: aws_dynamodb_table.submissions_table.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

#
# create HTTP API gateway
#

resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["POST", "GET", "PUT", "DELETE"]
    allow_headers = ["content-type", "authorization"]
    max_age = 300
  }
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "serverless_lambda_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
    })
  }
}

resource "aws_apigatewayv2_integration" "french_passport" {
  api_id = aws_apigatewayv2_api.lambda.id

  integration_uri    = aws_lambda_function.french_passport.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}


#
# routes
#

resource "aws_apigatewayv2_route" "french_passport_get_student" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /students/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_get_all_students" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /students/all"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_create_student" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "POST /students"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_update_student" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "PUT /students/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_delete_student" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "DELETE /students/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_get_teacher" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /teachers/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_get_all_teachers" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /teachers/all"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_create_teacher" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "POST /teachers"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_update_teacher" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "PUT /teachers/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_delete_teacher" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "DELETE /teachers/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_get_item" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /items/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_get_all_items" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /items/all"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_create_item" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "POST /items"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_update_item" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "PUT /items/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_delete_item" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "DELETE /items/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_get_submission" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /submissions/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_get_all_submissions" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "GET /submissions/all"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_apigatewayv2_route" "french_passport_create_submission" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "POST /submissions"
  target    = "integrations/${aws_apigatewayv2_integration.french_passport.id}"

  authorization_type = "JWT"
  authorizer_id = aws_apigatewayv2_authorizer.auth.id
  authorization_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.french_passport.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

#
# DymnamoDB tables
#

resource "aws_dynamodb_table" "accounts_table" {
  name = "FrenchPassportAccountsTable"
  billing_mode = "PROVISIONED"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  # attribute {
  #   name = "role"
  #   type = "S"
  # }

  # attribute {
  #   name = "firstName"
  #   type = "S"
  # }

  # attribute {
  #   name = "lastName"
  #   type = "S"
  # }

  # attribute {
  #   name = "completed"
  #   type = "S"
  # }

  # attribute {
  #   name = "createdAt"
  #   type = "N"
  # }

  # attribute {
  #   name = "createdBy"
  #   type = "S"
  # }

  # attribute {
  #   name = "updatedAt"
  #   type = "N"
  # }

  # attribute {
  #   name = "updatedBy"
  #   type = "S"
  # }

  # attribute {
  #   name = "deleted"
  #   type = "N"
  # }
}

resource "aws_dynamodb_table" "items_table" {
  name = "FrenchPassportItemsTable"
  billing_mode = "PROVISIONED"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  # attribute {
  #   name = "title"
  #   type = "S"
  # }

  # attribute {
  #   name = "desc"
  #   type = "S"
  # }

  # attribute {
  #   name = "icon"
  #   type = "S"
  # }

  # attribute {
  #   name = "submissionType"
  #   type = "S"
  # }

  # attribute {
  #   name = "submissionMessage"
  #   type = "S"
  # }

  # attribute {
  #   name = "createdAt"
  #   type = "N"
  # }

  # attribute {
  #   name = "createdBy"
  #   type = "S"
  # }

  # attribute {
  #   name = "updatedAt"
  #   type = "N"
  # }

  # attribute {
  #   name = "updatedBy"
  #   type = "S"
  # }

  # attribute {
  #   name = "deleted"
  #   type = "N"
  # }
}

resource "aws_dynamodb_table" "submissions_table" {
  name = "FrenchPassportSubmissionsTable"
  billing_mode = "PROVISIONED"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  # attribute {
  #   name = "accountId"
  #   type = "S"
  # }

  # attribute {
  #   name = "itemId"
  #   type = "S"
  # }

  # attribute {
  #   name = "createdAt"
  #   type = "N"
  # }

  # attribute {
  #   name = "createdBy"
  #   type = "S"
  # }

  # attribute {
  #   name = "updatedAt"
  #   type = "N"
  # }

  # attribute {
  #   name = "updatedBy"
  #   type = "S"
  # }

  # attribute {
  #   name = "deleted"
  #   type = "N"
  # }
}

resource "aws_dynamodb_table" "groups_table" {
  name = "FrenchPassportGroupsTable"
  billing_mode = "PROVISIONED"
  read_capacity = 1
  write_capacity = 1
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  # attribute {
  #   name = "title"
  #   type = "S"
  # }

  # attribute {
  #   name = "items"
  #   type = "SS"
  # }

  # attribute {
  #   name = "createdAt"
  #   type = "N"
  # }

  # attribute {
  #   name = "createdBy"
  #   type = "S"
  # }

  # attribute {
  #   name = "updatedAt"
  #   type = "N"
  # }

  # attribute {
  #   name = "updatedBy"
  #   type = "S"
  # }

  # attribute {
  #   name = "deleted"
  #   type = "N"
  # }
}

#
# Auth
#

resource "aws_cognito_user_pool" "pool" {
  name = "french_passport_user_pool"
}

resource "aws_cognito_resource_server" "resource_server" {
  name = "french_passport_resource_server"
  identifier = "french_passport"
  user_pool_id = aws_cognito_user_pool.pool.id

  scope {
    scope_name = "all"
    scope_description = "Testing access"
  }
}

resource "aws_cognito_user_pool_domain" "pool_domain" {
  domain = "french-passport"
  user_pool_id = aws_cognito_user_pool.pool.id
}

resource "aws_cognito_user_pool_client" "client" {
  name = "french_passport_user_pool_client"
  user_pool_id = aws_cognito_user_pool.pool.id
  callback_urls = ["http://localhost:3000/login"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows = ["code"]
  allowed_oauth_scopes = aws_cognito_resource_server.resource_server.scope_identifiers
  supported_identity_providers = ["COGNITO"]
}

resource "aws_apigatewayv2_authorizer" "auth" {
  api_id = aws_apigatewayv2_api.lambda.id
  authorizer_type = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name = "french-passport-cognito-auth"

  jwt_configuration {
    audience = [aws_cognito_user_pool_client.client.id]
    issuer = "https://${aws_cognito_user_pool.pool.endpoint}"
  }
}
