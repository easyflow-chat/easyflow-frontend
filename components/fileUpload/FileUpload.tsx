import Image from 'next/image';
import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction, useRef } from 'react';
import Button from '../button/Button';

interface FileUploadProps {
  allowedFileTypes: string[];
  icon: string;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

const FileUpload: FunctionComponent<FileUploadProps> = ({ allowedFileTypes, icon, setFile }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        if (allowedFileTypes.includes(e.dataTransfer.files[0].type)) {
          setFile(e.dataTransfer.files[0]);
        }
      }}
      className="tw-group tw-relative tw-m-5 tw-flex tw-h-48 tw-w-48 tw-flex-col tw-items-center tw-justify-center tw-rounded-md tw-border-dashed tw-border-gray-500 tw-bg-transparent tw-text-center xl:tw-h-96 xl:tw-w-96"
    >
      <input
        accept={allowedFileTypes.toString()}
        ref={inputRef}
        type="file"
        className="tw-hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.currentTarget.files) {
            setFile(e.currentTarget.files[0]);
          } else {
            setFile(undefined);
          }
        }}
      />
      <Image src={icon} alt="File type icon" />
      <p>Drag and Drop your file here or click</p>
      <p className="tw-mt-0">
        Allowed file types{' '}
        {allowedFileTypes
          .map(type => {
            return type.split('/')[1];
          })
          .join(', ')}
      </p>
      <Button onClick={() => inputRef.current?.click()}>Upload</Button>
    </div>
  );
};

export default FileUpload;
