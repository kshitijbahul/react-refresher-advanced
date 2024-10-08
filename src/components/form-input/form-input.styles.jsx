import styled, {css} from 'styled-components';


/* $sub-color: grey;
$main-color: black;
*/

const subColor = 'grey';
const mainColor = 'black';

/* This blocks becomes 
@mixin shrinkLabel {
  top: -14px;
  font-size: 12px;
  color: $main-color;
}
 */
const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const InputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({shrink})=> shrink && shrinkLabelStyles}
`;

export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ .${InputLabel} {
    ${shrinkLabelStyles}
    @include shrinkLabel();
  }
  
}
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 45px 0;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;
