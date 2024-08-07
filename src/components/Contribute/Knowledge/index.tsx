// src/components/Contribute/Knowledge/index.tsx
'use client';
import React, { useEffect, useState } from 'react';
import './knowledge.css';
import { Alert, AlertActionLink, AlertActionCloseButton } from '@patternfly/react-core/dist/dynamic/components/Alert';
import { ActionGroup, FormFieldGroupExpandable, FormFieldGroupHeader } from '@patternfly/react-core/dist/dynamic/components/Form';
import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import { Text } from '@patternfly/react-core/dist/dynamic/components/Text';
import { TextInput } from '@patternfly/react-core/dist/dynamic/components/TextInput';
import { Form } from '@patternfly/react-core/dist/dynamic/components/Form';
import { FormGroup } from '@patternfly/react-core/dist/dynamic/components/Form';
import { TextArea } from '@patternfly/react-core/dist/dynamic/components/TextArea';
import { PlusIcon, MinusCircleIcon, CodeIcon } from '@patternfly/react-icons/dist/dynamic/icons/';
import { validateFields, validateEmail, validateUniqueItems } from '../../../utils/validation';
import { getGitHubUsername } from '../../../utils/github';
import { useSession } from 'next-auth/react';
import YamlCodeModal from '../../YamlCodeModal';
import { UploadFile } from './UploadFile';
import { SchemaVersion, KnowledgeYamlData, AttributionData } from '@/types';
import KnowledgeDescription from './KnowledgeDescription';
import { dumpYaml } from '@/utils/yamlConfig';
import PathService from '@/components/PathService/PathService';

export const KnowledgeForm: React.FunctionComponent = () => {
  const { data: session } = useSession();
  const [githubUsername, setGithubUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      if (session?.accessToken) {
        try {
          const fetchedUsername = await getGitHubUsername(session.accessToken);
          setGithubUsername(fetchedUsername);
        } catch (error) {
          console.error('Failed to fetch GitHub username:', error);
        }
      }
    };

    fetchUsername();
  }, [session?.accessToken]);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [document_outline, setDocumentOutline] = useState('');
  const [submission_summary, setSubmissionSummary] = useState('');
  const [domain, setDomain] = useState('');
  const [filePath, setFilePath] = useState('');

  const [repo, setRepo] = useState('');
  const [commit, setCommit] = useState('');
  const [patterns, setPatterns] = useState('');

  const [title_work, setTitleWork] = useState('');
  const [link_work, setLinkWork] = useState('');
  const [revision, setRevision] = useState('');
  const [license_work, setLicenseWork] = useState('');
  const [creators, setCreators] = useState('');

  const [seedExamples, setSeedExamples] = useState([
    {
      context: '',
      questions_and_answers: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    },
    {
      context: '',
      questions_and_answers: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    },
    {
      context: '',
      questions_and_answers: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    },
    {
      context: '',
      questions_and_answers: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    },
    {
      context: '',
      questions_and_answers: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    }
  ]);

  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [isFailureAlertVisible, setIsFailureAlertVisible] = useState(false);

  const [failure_alert_title, setFailureAlertTitle] = useState('');
  const [failure_alert_message, setFailureAlertMessage] = useState<string>('');

  const [success_alert_title, setSuccessAlertTitle] = useState('');
  const [success_alert_message, setSuccessAlertMessage] = useState<React.ReactNode>('');
  const [successAlertLink, setSuccessAlertLink] = useState<string>('');

  const [useFileUpload, setUseFileUpload] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [yamlContent, setYamlContent] = useState('');

  const handleInputChange = (exampleIndex: number, type: string, value: string, qaIndex?: number) => {
    const updatedSeedExamples = [...seedExamples];
    if (type === 'context') {
      updatedSeedExamples[exampleIndex].context = value;
    } else if (qaIndex !== undefined) {
      if (type === 'question') {
        updatedSeedExamples[exampleIndex].questions_and_answers[qaIndex].question = value;
      } else if (type === 'answer') {
        updatedSeedExamples[exampleIndex].questions_and_answers[qaIndex].answer = value;
      }
    }
    setSeedExamples(updatedSeedExamples);
  };

  const addQuestionAnswerPair = (exampleIndex: number) => {
    const updatedSeedExamples = [...seedExamples];
    updatedSeedExamples[exampleIndex].questions_and_answers.push({ question: '', answer: '' });
    setSeedExamples(updatedSeedExamples);
  };

  const deleteQuestionAnswerPair = (exampleIndex: number, qaIndex: number) => {
    const updatedSeedExamples = [...seedExamples];
    updatedSeedExamples[exampleIndex].questions_and_answers = updatedSeedExamples[exampleIndex].questions_and_answers.filter((_, i) => i !== qaIndex);
    setSeedExamples(updatedSeedExamples);
  };

  const addSeedExample = () => {
    setSeedExamples([
      ...seedExamples,
      {
        context: '',
        questions_and_answers: [
          { question: '', answer: '' },
          { question: '', answer: '' },
          { question: '', answer: '' }
        ]
      }
    ]);
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setDocumentOutline('');
    setSubmissionSummary('');
    setDomain('');
    setRepo('');
    setCommit('');
    setPatterns('');
    setTitleWork('');
    setLinkWork('');
    setLicenseWork('');
    setCreators('');
    setRevision('');
    setUploadedFiles([]);
    setFilePath('');
    setSeedExamples([
      {
        context: '',
        questions_and_answers: [
          { question: '', answer: '' },
          { question: '', answer: '' },
          { question: '', answer: '' }
        ]
      },
      {
        context: '',
        questions_and_answers: [
          { question: '', answer: '' },
          { question: '', answer: '' },
          { question: '', answer: '' }
        ]
      },
      {
        context: '',
        questions_and_answers: [
          { question: '', answer: '' },
          { question: '', answer: '' },
          { question: '', answer: '' }
        ]
      },
      {
        context: '',
        questions_and_answers: [
          { question: '', answer: '' },
          { question: '', answer: '' },
          { question: '', answer: '' }
        ]
      },
      {
        context: '',
        questions_and_answers: [
          { question: '', answer: '' },
          { question: '', answer: '' },
          { question: '', answer: '' }
        ]
      }
    ]);
  };

  const onCloseSuccessAlert = () => {
    setIsSuccessAlertVisible(false);
  };

  const onCloseFailureAlert = () => {
    setIsFailureAlertVisible(false);
  };

  const handleFilesChange = (files: File[]) => {
    setUploadedFiles(files);
    setPatterns(files.map((file) => file.name).join(', ')); // Populate the patterns field
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Strip leading slash and ensure trailing slash in the file path
    let sanitizedFilePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    sanitizedFilePath = sanitizedFilePath.endsWith('/') ? sanitizedFilePath : `${sanitizedFilePath}/`;

    const infoFields = { email, name, document_outline, submission_summary, domain, repo, commit, patterns };
    const attributionFields = { title_work, link_work, revision, license_work, creators };

    let validation = validateFields(infoFields);
    if (!validation.valid) {
      setFailureAlertTitle('Something went wrong!');
      setFailureAlertMessage(validation.message);
      setIsFailureAlertVisible(true);
      return;
    }

    validation = validateFields(attributionFields);
    if (!validation.valid) {
      setFailureAlertTitle('Something went wrong!');
      setFailureAlertMessage(validation.message);
      setIsFailureAlertVisible(true);
      return;
    }

    validation = validateEmail(email);
    if (!validation.valid) {
      setFailureAlertTitle('Something went wrong!');
      setFailureAlertMessage(validation.message);
      setIsFailureAlertVisible(true);
      return;
    }

    for (const example of seedExamples) {
      const questions = example.questions_and_answers.map((qa) => qa.question);
      const answers = example.questions_and_answers.map((qa) => qa.answer);
      validation = validateUniqueItems(questions, 'questions');
      if (!validation.valid) {
        setFailureAlertTitle('Something went wrong!');
        setFailureAlertMessage(validation.message);
        setIsFailureAlertVisible(true);
        return;
      }

      validation = validateUniqueItems(answers, 'answers');
      if (!validation.valid) {
        setFailureAlertTitle('Something went wrong!');
        setFailureAlertMessage(validation.message);
        setIsFailureAlertVisible(true);
        return;
      }
    }

    const knowledgeData: KnowledgeYamlData = {
      created_by: githubUsername!,
      version: SchemaVersion,
      domain: domain,
      document_outline: document_outline,
      seed_examples: seedExamples.map((example) => ({
        context: example.context,
        questions_and_answers: example.questions_and_answers.map((qa) => ({
          question: qa.question,
          answer: qa.answer
        }))
      })),
      document: {
        repo: repo,
        commit: commit,
        patterns: patterns.split(',').map((pattern) => pattern.trim())
      }
    };

    const yamlString = dumpYaml(knowledgeData);

    const attributionData: AttributionData = {
      title_of_work: title_work,
      link_to_work: link_work,
      revision: revision,
      license_of_the_work: license_work,
      creator_names: creators
    };

    try {
      const response = await fetch('/api/pr/knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: yamlString, attribution: attributionData, name, email, submission_summary, filePath: sanitizedFilePath })
      });

      if (!response.ok) {
        throw new Error('Failed to submit knowledge data');
      }

      const result = await response.json();
      setSuccessAlertTitle('Knowledge contribution submitted successfully!');
      setSuccessAlertMessage('A pull request containing your knowledge submission has been successfully created.');
      setSuccessAlertLink(result.html_url);
      setIsSuccessAlertVisible(true);
      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFailureAlertTitle('Failed to submit your Knowledge contribution');
        setFailureAlertMessage(error.message);
        setIsFailureAlertVisible(true);
      }
    }
  };

  const handleDocumentUpload = async () => {
    if (uploadedFiles.length > 0) {
      const fileContents: { fileName: string; fileContent: string }[] = [];

      await Promise.all(
        uploadedFiles.map(
          (file) =>
            new Promise<void>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const fileContent = e.target!.result as string;
                fileContents.push({ fileName: file.name, fileContent });
                resolve();
              };
              reader.onerror = reject;
              reader.readAsText(file);
            })
        )
      );

      if (fileContents.length === uploadedFiles.length) {
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ files: fileContents })
          });

          const result = await response.json();
          if (response.ok) {
            setRepo(result.repoUrl);
            setCommit(result.commitSha);
            setPatterns(result.documentNames.join(', ')); // Populate the patterns field
            console.log('Files uploaded:', result.documentNames);
            setSuccessAlertTitle('Document uploaded successfully!');
            setSuccessAlertMessage('Documents have been uploaded to your repo to be referenced in the knowledge submission.');
            setSuccessAlertLink(result.prUrl);
            setIsSuccessAlertVisible(true);
            setUseFileUpload(false); // Switch back to manual mode to display the newly created values in the knowledge submission
          } else {
            throw new Error(result.error || 'Failed to upload document');
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setFailureAlertTitle('Failed to upload document');
            setFailureAlertMessage(error.message);
            setIsFailureAlertVisible(true);
          }
        }
      }
    }
  };

  const handleDownloadYaml = () => {
    const infoFields = { email, name, document_outline, submission_summary, domain, repo, commit, patterns };
    const attributionFields = { title_work, link_work, revision, license_work, creators };

    let validation = validateFields(infoFields);
    if (!validation.valid) {
      setFailureAlertTitle('Something went wrong!');
      setFailureAlertMessage(validation.message);
      setIsFailureAlertVisible(true);
      return;
    }

    validation = validateFields(attributionFields);
    if (!validation.valid) {
      setFailureAlertTitle('Something went wrong!');
      setFailureAlertMessage(validation.message);
      setIsFailureAlertVisible(true);
      return;
    }

    validation = validateEmail(email);
    if (!validation.valid) {
      setFailureAlertTitle('Something went wrong!');
      setFailureAlertMessage(validation.message);
      setIsFailureAlertVisible(true);
      return;
    }

    const yamlData: KnowledgeYamlData = {
      created_by: githubUsername!,
      version: SchemaVersion,
      domain: domain,
      document_outline: document_outline,
      seed_examples: seedExamples.map((example) => ({
        context: example.context,
        questions_and_answers: example.questions_and_answers.map((qa) => ({
          question: qa.question,
          answer: qa.answer
        }))
      })),
      document: {
        repo: repo,
        commit: commit,
        patterns: patterns.split(',').map((pattern) => pattern.trim())
      }
    };

    const yamlString = dumpYaml(yamlData);
    const blob = new Blob([yamlString], { type: 'application/x-yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'knowledge.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAttribution = () => {
    const attributionFields = { title_work, link_work, revision, license_work, creators };

    const validation = validateFields(attributionFields);
    if (!validation.valid) {
      setFailureAlertTitle('Something went wrong!');
      setFailureAlertMessage(validation.message);
      setIsFailureAlertVisible(true);
      return;
    }

    const attributionContent = `Title of work: ${title_work}
Link to work: ${link_work}
Revision: ${submission_summary}
License of the work: ${license_work}
Creator names: ${creators}
`;

    const blob = new Blob([attributionContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attribution.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleViewYaml = () => {
    const yamlData: KnowledgeYamlData = {
      created_by: githubUsername!,
      version: SchemaVersion,
      domain: domain,
      document_outline: document_outline,
      seed_examples: seedExamples.map((example) => ({
        context: example.context,
        questions_and_answers: example.questions_and_answers.map((qa) => ({
          question: qa.question,
          answer: qa.answer
        }))
      })),
      document: {
        repo: repo,
        commit: commit,
        patterns: patterns.split(',').map((pattern) => pattern.trim())
      }
    };

    const yamlString = dumpYaml(yamlData);
    setYamlContent(yamlString);
    setIsModalOpen(true);
  };

  return (
    <Form className="form-k">
      <YamlCodeModal isModalOpen={isModalOpen} handleModalToggle={() => setIsModalOpen(!isModalOpen)} yamlContent={yamlContent} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormFieldGroupHeader titleText={{ text: 'Knowledge Contribution Form', id: 'knowledge-contribution-form-id' }} />
        <Button variant="plain" onClick={handleViewYaml} aria-label="View YAML">
          <CodeIcon /> View YAML
        </Button>
      </div>

      <FormFieldGroupExpandable
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader
            titleText={{ text: 'Knowledge Description', id: 'knowledge-description' }}
            titleDescription="What is InstructLab Knowledge?"
          />
        }
      >
        <KnowledgeDescription />
      </FormFieldGroupExpandable>

      <FormFieldGroupExpandable
        isExpanded
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader
            titleText={{ text: 'Author Info', id: 'author-info-id' }}
            titleDescription="Provide your information required for a GitHub DCO sign-off."
          />
        }
      >
        <FormGroup isRequired key={'author-info-details-id'}>
          <TextInput
            isRequired
            type="email"
            aria-label="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(_event, value) => setEmail(value)}
          />
          <TextInput
            isRequired
            type="text"
            aria-label="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(_event, value) => setName(value)}
          />
        </FormGroup>
      </FormFieldGroupExpandable>
      <FormFieldGroupExpandable
        isExpanded
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader
            titleText={{ text: 'Knowledge Info', id: 'knowledge-info-id' }}
            titleDescription="Provide brief information about the knowledge."
          />
        }
      >
        <FormGroup key={'knowledge-info-details-id'}>
          <TextInput
            isRequired
            type="text"
            aria-label="submission_summary"
            placeholder="Enter a brief description for a submission summary (60 character max)"
            value={submission_summary}
            onChange={(_event, value) => setSubmissionSummary(value)}
            maxLength={60}
          />
          <TextInput
            isRequired
            type="text"
            aria-label="domain"
            placeholder="Enter domain information"
            value={domain}
            onChange={(_event, value) => setDomain(value)}
          />
          <TextArea
            isRequired
            type="text"
            aria-label="document_outline"
            placeholder="Enter a detailed document outline (min 40 characters)"
            value={document_outline}
            onChange={(_event, value) => setDocumentOutline(value)}
            minLength={40}
          />
        </FormGroup>
      </FormFieldGroupExpandable>
      <FormFieldGroupExpandable
        isExpanded
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader
            titleText={{ text: 'File Path Info', id: 'file-path-info-id' }}
            titleDescription="Specify the file path for the QnA and Attribution files."
          />
        }
      >
        <FormGroup isRequired key={'file-path-service-id'}>
          <PathService rootPath="knowledge" handlePathChange={setFilePath} />
        </FormGroup>
      </FormFieldGroupExpandable>
      <FormFieldGroupExpandable
        isExpanded
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader
            titleText={{ text: 'Seed Examples', id: 'seed-examples-id' }}
            titleDescription="Add seed examples with context and Q&A pairs"
          />
        }
      >
        {seedExamples.map((example, exampleIndex) => (
          <FormGroup key={exampleIndex}>
            <Text className="heading-k">Knowledge Seed Example {exampleIndex + 1}</Text>
            <TextArea
              isRequired
              type="text"
              aria-label={`Context ${exampleIndex + 1}`}
              placeholder="Enter the context"
              value={example.context}
              onChange={(_event, value) => handleInputChange(exampleIndex, 'context', value)}
            />
            {example.questions_and_answers.map((qa, qaIndex) => (
              <React.Fragment key={qaIndex}>
                <TextArea
                  isRequired
                  type="text"
                  aria-label={`Question ${exampleIndex + 1}-${qaIndex + 1}`}
                  placeholder={`Enter question ${qaIndex + 1}`}
                  value={qa.question}
                  onChange={(_event, value) => handleInputChange(exampleIndex, 'question', value, qaIndex)}
                />
                <TextArea
                  isRequired
                  type="text"
                  aria-label={`Answer ${exampleIndex + 1}-${qaIndex + 1}`}
                  placeholder={`Enter answer ${qaIndex + 1}`}
                  value={qa.answer}
                  onChange={(_event, value) => handleInputChange(exampleIndex, 'answer', value, qaIndex)}
                />
                <Button variant="danger" onClick={() => deleteQuestionAnswerPair(exampleIndex, qaIndex)}>
                  <MinusCircleIcon /> Delete Question and Answer
                </Button>
              </React.Fragment>
            ))}
            <div style={{ marginTop: '10px', marginBottom: '20px' }}>
              <Button variant="primary" onClick={() => addQuestionAnswerPair(exampleIndex)}>
                <PlusIcon /> Add Question and Answer
              </Button>
            </div>
          </FormGroup>
        ))}
        <Button variant="primary" onClick={addSeedExample}>
          <PlusIcon /> Add Knowledge Seed Example
        </Button>
      </FormFieldGroupExpandable>

      <FormFieldGroupExpandable
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader titleText={{ text: 'Document Info', id: 'doc-info-id' }} titleDescription="Add the relevant document's information" />
        }
      >
        <FormGroup>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant={useFileUpload ? 'primary' : 'secondary'}
              className={useFileUpload ? 'button-active' : 'button-secondary'}
              onClick={() => setUseFileUpload(true)}
            >
              Automatically Upload Documents
            </Button>
            <Button
              variant={useFileUpload ? 'secondary' : 'primary'}
              className={!useFileUpload ? 'button-active' : 'button-secondary'}
              onClick={() => setUseFileUpload(false)}
            >
              Manually Enter Document Details
            </Button>
          </div>
        </FormGroup>

        {!useFileUpload ? (
          <FormGroup key={'doc-info-details-id'}>
            <TextInput
              isRequired
              type="url"
              aria-label="repo"
              placeholder="Enter repo url where document exists"
              value={repo}
              onChange={(_event, value) => setRepo(value)}
            />
            <TextInput
              isRequired
              type="text"
              aria-label="commit"
              placeholder="Enter the commit sha of the document in that repo"
              value={commit}
              onChange={(_event, value) => setCommit(value)}
            />
            <TextInput
              isRequired
              type="text"
              aria-label="patterns"
              placeholder="Enter the documents name (comma separated)"
              value={patterns}
              onChange={(_event, value) => setPatterns(value)}
            />
          </FormGroup>
        ) : (
          <>
            <UploadFile onFilesChange={handleFilesChange} />
            <Button variant="primary" onClick={handleDocumentUpload}>
              Submit Files
            </Button>
          </>
        )}
      </FormFieldGroupExpandable>

      <FormFieldGroupExpandable
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader
            titleText={{ text: 'Attribution Info', id: 'attribution-info-id' }}
            titleDescription="Provide attribution information."
          />
        }
      >
        <FormGroup isRequired key={'attribution-info-details-id'}>
          <TextInput
            isRequired
            type="text"
            aria-label="title_work"
            placeholder="Enter title of work"
            value={title_work}
            onChange={(_event, value) => setTitleWork(value)}
          />
          <TextInput
            isRequired
            type="url"
            aria-label="link_work"
            placeholder="Enter link to work"
            value={link_work}
            onChange={(_event, value) => setLinkWork(value)}
          />
          <TextInput
            isRequired
            type="text"
            aria-label="revision"
            placeholder="Enter document revision information"
            value={revision}
            onChange={(_event, value) => setRevision(value)}
          />
          <TextInput
            isRequired
            type="text"
            aria-label="license_work"
            placeholder="Enter license of the work"
            value={license_work}
            onChange={(_event, value) => setLicenseWork(value)}
          />
          <TextInput
            isRequired
            type="text"
            aria-label="creators"
            placeholder="Enter creators Name"
            value={creators}
            onChange={(_event, value) => setCreators(value)}
          />
        </FormGroup>
      </FormFieldGroupExpandable>
      {isSuccessAlertVisible && (
        <Alert
          variant="success"
          title={success_alert_title}
          actionClose={<AlertActionCloseButton onClose={onCloseSuccessAlert} />}
          actionLinks={
            <>
              <AlertActionLink component="a" href={successAlertLink} target="_blank" rel="noopener noreferrer">
                View it here
              </AlertActionLink>
            </>
          }
        >
          {success_alert_message}
        </Alert>
      )}
      {isFailureAlertVisible && (
        <Alert variant="danger" title={failure_alert_title} actionClose={<AlertActionCloseButton onClose={onCloseFailureAlert} />}>
          {failure_alert_message}
        </Alert>
      )}

      <ActionGroup>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit Knowledge
        </Button>
        <Button variant="primary" type="button" onClick={handleDownloadYaml}>
          Download YAML
        </Button>
        <Button variant="primary" type="button" onClick={handleDownloadAttribution}>
          Download Attribution
        </Button>
      </ActionGroup>
    </Form>
  );
};

export default KnowledgeForm;
