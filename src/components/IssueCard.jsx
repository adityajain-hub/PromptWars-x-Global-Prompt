import React from 'react';

export default function IssueCard({ issue }) {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'Resolved': return 'badge-resolved';
      case 'In Progress': return 'badge-progress';
      default: return 'badge-pending';
    }
  };

  return (
    <div className="card" style={{ marginBottom: '15px', padding: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <h4 style={{ margin: '0 0 5px 0' }}>{issue.description}</h4>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ID: {issue.id} • {issue.category}</span>
        </div>
        <span className={`badge ${getBadgeClass(issue.status)}`}>{issue.status}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <span>📍 {issue.location}</span>
        <span>📅 {issue.date}</span>
      </div>
    </div>
  );
}
