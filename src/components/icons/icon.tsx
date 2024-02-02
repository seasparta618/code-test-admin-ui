import type { FC, SVGProps } from 'react';
import { ColorEnum } from '../../utils/color';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  strokeWidth?: string;
}

const defaultIconProps: IconProps = {
  size: 24,
  color: ColorEnum.GREY,
  strokeWidth: '2',
};

export const EditIcon: FC<IconProps> = ({ size, color, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
        stroke="black"
        strokeWidth={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
EditIcon.defaultProps = defaultIconProps;

export const NoUsersIcon: FC<IconProps> = ({ size, color, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.5 16L21.5 21M21.5 16L16.5 21M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M12 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
NoUsersIcon.defaultProps = defaultIconProps;

export const RemoveIcon: FC<IconProps> = ({ size, color, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
RemoveIcon.defaultProps = defaultIconProps;

export const SearchIcon: FC<IconProps> = ({ size, color, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
SearchIcon.defaultProps = defaultIconProps;

export const CrossIcon: FC<IconProps> = ({ size, color, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
CrossIcon.defaultProps = defaultIconProps;

export const DoubleChevronLeftIcon: FC<IconProps> = ({
  size,
  color,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 17L13 12L18 7M11 17L6 12L11 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
DoubleChevronLeftIcon.defaultProps = defaultIconProps;

export const DoublChevronRightIcon: FC<IconProps> = ({
  size,
  color,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 17L11 12L6 7M13 17L18 12L13 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
DoublChevronRightIcon.defaultProps = defaultIconProps;

export const ChevronLeftIcon: FC<IconProps> = ({ size, color, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
ChevronLeftIcon.defaultProps = defaultIconProps;

export const ChevronRightIcon: FC<IconProps> = ({ size, color, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
ChevronRightIcon.defaultProps = defaultIconProps;
