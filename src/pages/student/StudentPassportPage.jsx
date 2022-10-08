import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ScrollingLayout from '../../layouts/ScrollingLayout';
import StandardHeader from '../../shared/StandardHeader';
import MobilePassportItem from '../../shared/MobilePassportItem';
import ItemCompletionModal from '../../shared/ItemCompletionModal';
import items from '../../items.json';
import accounts from '../../accounts.json';

function QuickLinks({ groups }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        height: '50px',
        overflowX: 'scroll'
      }}
    >
      {groups.map((group) => (
        <span style={{ textAlign: 'center', minWidth: '75px' }}>{group}</span>
      ))}
    </div>
  );
}

function ScrollView({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        width: '99%',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        marginBottom: '20px',
        gap: '20px'
      }}
    >
      {children}
    </div>
  );
}

export default function StudentPassportPage() {
  const defaultItems = items.items;
  const defaultAccounts = accounts.accounts;
  const activeAccount = defaultAccounts[0];

  const groups = defaultItems.reduce((acc, item) => {
    acc[item.group] = true;
    return acc;
  }, {});

  const [passportItems] = useState(defaultItems);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const headerRenderer = () => <StandardHeader subHeaderText="Passport" />;
  const contentRenderer = () => (
    <>
      {ReactDOM.createPortal(
        <ItemCompletionModal
          completionText={selectedItem ? selectedItem.desc : ''}
          show={showModal}
          onComplete={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
        />,
        document.getElementById('root')
      )}
      <QuickLinks groups={Object.keys(groups)} />
      <ScrollView>
        {passportItems.map((item) => (
          <MobilePassportItem
            title={item.title}
            desc={item.desc}
            iconSelection={item.icon}
            completed={activeAccount.completed.includes(item.id)}
            onCheck={() => {
              setSelectedItem(item);
              setShowModal(true);
            }}
          />
        ))}
      </ScrollView>
    </>
  );

  return <ScrollingLayout headerRenderer={headerRenderer} contentRenderer={contentRenderer} />;
}
