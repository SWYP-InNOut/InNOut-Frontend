import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Txt from './common/text/Txt';
import { Col } from './common/flex/Flex';
import ErrorMessage from './auth/ErrorMessage';
import TextInput from './common/input/TextInput';
import { CONFIG, INPUT_TYPE } from '@constants/form';
import { colors } from '@styles/theme';

interface ChangePropertyProps {
  title: string;
  subtitle?: string;
  content?: string;
  placeholder?: string;
  id: keyof typeof INPUT_TYPE;
  onChange?: (value: string) => void;
  isDuplicateNickname?: boolean;
  newPassword?: boolean;
}

const ChangeProperty = (props: ChangePropertyProps) => {
  const {
    title,
    subtitle,
    content,
    id,
    placeholder,
    onChange,
    isDuplicateNickname,
    newPassword = true,
  } = props;

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      [INPUT_TYPE[id]]: content || '',
    },
  });

  const {
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = methods;

  const value = watch(INPUT_TYPE[id]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange, isDuplicateNickname]);

  const handleCheckError = (id: string, regex: RegExp) => {
    const value = getValues(id);
    if (!value) return 'default';
    else if (regex.test(value)) return 'success';
    else return 'error';
  };

  const renderError = (): React.ReactNode => {
    const errorComponents = CONFIG[id].validation?.map((validationRule, index) => {
      const message = validationRule.errorMessages || '유효하지 않은 입력입니다.';
      return (
        <ErrorMessage
          key={index}
          content={message}
          isError={handleCheckError(INPUT_TYPE[id], validationRule.pattern)}
        />
      );
    });
    return errorComponents?.filter(Boolean) || null;
  };

  return (
    <div>
      <Col gap={'12'}>
        <Col gap={'8'}>
          <Col>
            <Txt variant="t20">{title}</Txt>
            {subtitle && (
              <Txt variant="c14" color={colors.lightGray}>
                {subtitle}
              </Txt>
            )}
          </Col>
          <FormProvider {...methods}>
            <TextInput
              type="password"
              id={INPUT_TYPE[id]}
              placeholder={placeholder}
              content={content}
            />
          </FormProvider>
        </Col>
        <Col gap={'5'}>{newPassword ? renderError() : null}</Col>
      </Col>
    </div>
  );
};

export default ChangeProperty;
