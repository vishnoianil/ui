// src/components/Contribute/Knowledge/KnowledgeQuestionAnswerPairs/KnowledgeQuestionAnswerPairs.tsx
import React from 'react';
import { SkillSeedExample } from '@/types';
import {
  FormGroup,
  Tooltip,
  Button,
  TextArea,
  FormHelperText,
  HelperText,
  HelperTextItem,
  ValidatedOptions,
  Form,
  Flex,
  FlexItem
} from '@patternfly/react-core';
import { CatalogIcon, ExclamationCircleIcon } from '@patternfly/react-icons';
import { t_global_spacer_md as MdSpacerSize } from '@patternfly/react-tokens';

interface Props {
  seedExample: SkillSeedExample;
  seedExampleIndex: number;
  onSelectContext?: (seedExampleIndex: number) => void;
  handleContextInputChange: (seedExampleIndex: number, contextValue: string, validate?: boolean) => void;
  handleQuestionInputChange: (seedExampleIndex: number, questionValue: string) => void;
  handleQuestionBlur: (seedExampleIndex: number) => void;
  handleAnswerInputChange: (seedExampleIndex: number, answerValue: string) => void;
  handleAnswerBlur: (seedExampleIndex: number) => void;
}

const SkillQuestionAnswerPairs: React.FC<Props> = ({
  seedExample,
  seedExampleIndex,
  onSelectContext,
  handleContextInputChange,
  handleQuestionInputChange,
  handleQuestionBlur,
  handleAnswerInputChange,
  handleAnswerBlur
}) => {
  // Handle context input change with word count validation
  const onContextChange = (_event: React.FormEvent<HTMLTextAreaElement>, contextValue: string) => {
    handleContextInputChange(seedExampleIndex, contextValue);
  };

  return (
    <Flex style={{ padding: MdSpacerSize.var }} direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
      {onSelectContext ? (
        <FlexItem>
          <Tooltip content={<div>Select context from your knowledge files</div>} position="top">
            <Button variant="secondary" onClick={() => onSelectContext(seedExampleIndex)} style={{ marginBottom: '10px' }}>
              <CatalogIcon /> Select Context from Files
            </Button>
          </Tooltip>
        </FlexItem>
      ) : null}
      <FlexItem>
        <Form>
          <FormGroup label="Question" fieldId="question" isRequired={seedExample.questionAndAnswer.immutable}>
            <TextArea
              isRequired
              id="question"
              type="text"
              aria-label="Question"
              placeholder="Enter question"
              value={seedExample.questionAndAnswer.question}
              maxLength={250}
              validated={seedExample.questionAndAnswer.isQuestionValid}
              onChange={(_event, questionValue) => handleQuestionInputChange(seedExampleIndex, questionValue)}
              onBlur={() => handleQuestionBlur(seedExampleIndex)}
            />
            {seedExample.questionAndAnswer.isQuestionValid === ValidatedOptions.error && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem icon={<ExclamationCircleIcon />} variant={seedExample.questionAndAnswer.isQuestionValid}>
                    {seedExample.questionAndAnswer.questionValidationError ||
                      'Required field. Total length of all Q&A pairs should be less than 250 words.'}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>
          <FormGroup label="Answer" fieldId="answer" isRequired={seedExample.questionAndAnswer.immutable}>
            <TextArea
              id="answer"
              isRequired
              type="text"
              aria-label="Answer"
              placeholder="Enter answer"
              value={seedExample.questionAndAnswer.answer}
              maxLength={250}
              validated={seedExample.questionAndAnswer.isAnswerValid}
              onChange={(_event, answerValue) => handleAnswerInputChange(seedExampleIndex, answerValue)}
              onBlur={() => handleAnswerBlur(seedExampleIndex)}
            />
            {seedExample.questionAndAnswer.isAnswerValid === ValidatedOptions.error ? (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem icon={<ExclamationCircleIcon />} variant={seedExample.questionAndAnswer.isAnswerValid}>
                    {seedExample.questionAndAnswer.answerValidationError ||
                      'Required field. Total length of all Q&A pairs should be less than 250 words.'}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            ) : null}
          </FormGroup>
          <FormGroup id="" label="Context">
            <TextArea
              isRequired
              type="text"
              aria-label={`Context ${seedExampleIndex + 1}`}
              placeholder="Enter the context from which the Q&A pair is derived. (optional)"
              value={seedExample.context}
              onChange={onContextChange}
              style={{ marginBottom: '20px' }}
            />
          </FormGroup>
        </Form>
      </FlexItem>
    </Flex>
  );
};

export default SkillQuestionAnswerPairs;
