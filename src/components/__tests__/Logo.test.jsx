import React from 'react';
import { render } from '@testing-library/react';
import Logo from '../Logo';
import { describe, it, expect } from 'vitest';

describe('Logo Component', () => {
  it('renders the SVG logo correctly', () => {
    const { container } = render(<Logo />);
    const svgElement = container.querySelector('svg');
    
    // Check if SVG exists
    expect(svgElement).toBeInTheDocument();
    
    // Check for correct viewBox attributes
    expect(svgElement).toHaveAttribute('viewBox', '0 0 100 100');
    
    // Check for inner circle paths (Ashoka chakra reference)
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);
  });
});
