import React, { FunctionComponent } from 'react';
import { Formik, FormikProps, Field } from 'formik';
import * as Yup from 'yup';
import Split from '../layouts/Split';
import List from '../layouts/List';
import Button from '../buttons/Button';
import GoodButton from '../buttons/GoodButton';
import Title from '../texts/Title';
import Control from '../inputs/Control';
import RegularEditor from '../editors/RegularEditor';
import { IComponentProps } from '../../utils/components';
import { Link } from 'lumbridge';
import FormList from '../layouts/FormList';
import { cleanFormPrefill } from '../../utils/form';

interface ICodeFragment {
  id?: string;
  name?: string;
  shortcut?: string;
  contents?: string;
}

interface ICodeFormProps extends IComponentProps {
  handlers: {
    submit: (data: any) => void;
  };
  data: {
    title: string;
    loading: boolean;
    prefill: ICodeFragment;
  };
}

const CodeForm: FunctionComponent<ICodeFormProps> = ({ data, handlers }) => {
  const prefill: ICodeFragment = cleanFormPrefill(
    {
      name: '',
      shortcut: '',
      contents: '',
    },
    data.prefill
  );
  const validation = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(),
    shortcut: Yup.string()
      .lowercase()
      .trim()
      .required(),
    contents: Yup.string()
      .trim()
      .required(),
  });
  const form = ({
    setFieldValue,
    handleChange,
    errors,
    touched,
  }: FormikProps<ICodeFragment>) => {
    const editorChange = ({ value }: { value: string }) =>
      setFieldValue('contents', value);
    const nameChange = (event: any) => {
      handleChange(event);
      if (!prefill.shortcut && !touched.shortcut) {
        const short = String(event.target.value || '')
          .split(' ')
          .filter(word => word && word.length)
          .map(word => word.charAt(0))
          .join('')
          .toLowerCase();
        setFieldValue('shortcut', short);
      }
    };
    return (
      <FormList>
        <Split reverse={true}>
          <List wide={true}>
            <Button auto="right" as={Link} to="/">
              Back
            </Button>
            <br />
            <Title>{data.title}</Title>
            <br />
            <Field
              name="name"
              label="Name"
              help="The name of your snippet."
              placeholder="E.g. React Component"
              component={Control}
              onChange={nameChange}
              problem={touched.name && errors.name}
            />
            <Field
              name="shortcut"
              label="Shortcut"
              help="Find the snippet quickly with this shortcut."
              placeholder="E.g. abc"
              component={Control}
              problem={touched.shortcut && errors.shortcut}
            />
            <GoodButton type="submit" auto="right" loading={data.loading}>
              Save
            </GoodButton>
          </List>
          <RegularEditor
            initialValue={prefill.contents}
            onChange={editorChange}
          />
        </Split>
      </FormList>
    );
  };
  return (
    <Formik
      initialValues={prefill}
      validationSchema={validation}
      onSubmit={handlers.submit}
      render={form}
    />
  );
};

export default CodeForm;
