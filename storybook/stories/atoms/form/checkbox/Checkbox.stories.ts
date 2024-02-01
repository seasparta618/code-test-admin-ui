import { BuildCheckbox } from "./Checkbox";

export default {
    title: '/Atoms/Form/Checkbox',
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['sm', 'md'],
            description: 'set the size for checkbox',
        }
    },
};

export const Checkbox = (args) => {
    return BuildCheckbox({ ...args });
};
Checkbox.args = {
    size: 'sm',
};
