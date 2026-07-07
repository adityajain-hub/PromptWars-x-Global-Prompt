import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '../ConfirmModal';
import { describe, it, expect, vi } from 'vitest';

describe('ConfirmModal Component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <ConfirmModal 
        isOpen={false} 
        title="Test Title" 
        message="Test Message" 
        onConfirm={() => {}} 
        onCancel={() => {}} 
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when isOpen is true', () => {
    render(
      <ConfirmModal 
        isOpen={true} 
        title="Delete Chat" 
        message="Are you sure?" 
        onConfirm={() => {}} 
        onCancel={() => {}} 
      />
    );
    
    expect(screen.getByText('Delete Chat')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm when Confirm button is clicked', () => {
    const handleConfirm = vi.fn();
    render(
      <ConfirmModal 
        isOpen={true} 
        title="Test" 
        message="Test msg" 
        onConfirm={handleConfirm} 
        onCancel={() => {}} 
      />
    );
    
    fireEvent.click(screen.getByText('Confirm'));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel button is clicked', () => {
    const handleCancel = vi.fn();
    render(
      <ConfirmModal 
        isOpen={true} 
        title="Test" 
        message="Test msg" 
        onConfirm={() => {}} 
        onCancel={handleCancel} 
      />
    );
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
