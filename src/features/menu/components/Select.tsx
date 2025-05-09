import { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

type SelectProps = {
  options: { title: string; value: string; id: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

function Select({ options, ...delegated }: SelectProps) {
  return (
    <StyledSelect {...delegated}>
      {options.map(({ title, value, id }) => (
        <option key={id} value={value}>
          {title}
        </option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  padding: 8px 16px;
  background-color: var(--color-gray-500);
  color: var(--color-gray-100);
  border-radius: 8px;

  font-size: 1.5rem;

  option {
    font-size: 1.25rem;
  }
`;

export default Select;
