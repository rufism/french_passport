import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SingleEditLayout from '../../../layouts/SingleEditLayout';
import StandardHeader from '../../../shared/StandardHeader';
import * as api from '../../../api/base';

export default function TeacherItemView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    async function getItem() {
      setLoading(true);

      const res = await api.getItem(location.state.id);
      setItem(res);

      setLoading(false);
    }

    getItem();
  }, []);

  let contentMarkup;
  if (loading) {
    contentMarkup = <div>Loading</div>;
  } else {
    contentMarkup = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '80%',
          height: '100%'
        }}
      >
        {/* Label */}
        <div>
          <div style={{ textAlign: 'left' }}>
            <div>Title</div>
            <div>{item.title}</div>
          </div>
        </div>

        {/* Group  */}
        <div>
          <div style={{ textAlign: 'left' }}>
            <div>Group</div>
            <div>{item.group}</div>
          </div>
        </div>

        {/* Description */}
        <div>
          <div style={{ textAlign: 'left' }}>
            <div>Description</div>
            <div>{item.desc}</div>
          </div>
        </div>

        {/* Completion Text */}
        <div>
          <div style={{ textAlign: 'left' }}>
            <div>Completion Text</div>
            <div>{item.submissionMessage}</div>
          </div>
        </div>

        {/* Icon */}
        <div>
          <div style={{ textAlign: 'left' }}>
            <div>Icon </div>
          </div>
        </div>
      </div>
    );
  }

  const headerRenderer = () => <StandardHeader subHeaderText="Item View" />;
  const contentRenderer = () => contentMarkup;
  const footerRenderer = () => (
    <div>
      <button type="button" onClick={() => navigate('/teacher')}>
        Back
      </button>
      <button
        type="button"
        onClick={() => {
          navigate('/teacher/item/edit', {
            state: {
              id: item.id,
              currName: item.title,
              currGroup: item.group,
              currDescription: item.desc,
              currCompletionText: item.completionText,
              currIconSelection: item.icon
            }
          });
        }}
      >
        Edit
      </button>
    </div>
  );

  return (
    <SingleEditLayout
      headerRenderer={headerRenderer}
      contentRenderer={contentRenderer}
      footerRenderer={footerRenderer}
    />
  );
}
