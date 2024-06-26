import Image from 'next/image';
import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction, useRef } from 'react';

interface FileUploadProps {
  allowedFileTypes: string[];
  // eslint-disable-next-line
  icon: any;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

const FileUpload: FunctionComponent<FileUploadProps> = ({ allowedFileTypes, icon, setFile }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        if (e.dataTransfer.files[0] && allowedFileTypes.includes(e.dataTransfer.files[0].type)) {
          setFile(e.dataTransfer.files[0]);
        }
      }}
      className="tw-group tw-relative tw-m-5 tw-flex tw-h-48 tw-w-48 tw-flex-col tw-items-center tw-justify-center tw-rounded-md tw-border-dashed tw-border-gray-500 tw-bg-transparent tw-p-3 tw-text-center xl:tw-h-96 xl:tw-w-96"
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
      <Image src={icon} alt="File type icon" className="tw-h-8 tw-w-8 xl:tw-h-24 xl:tw-w-24 dark:tw-invert" />
      <p>Drag and Drop your file here or click</p>
      <p className="tw-mt-0">
        Allowed file types{' '}
        {allowedFileTypes
          .map(type => {
            return type.split('/')[1];
          })
          .join(', ')}
      </p>
      <ewc-button onClick={() => inputRef.current?.click()} label="Upload" />
    </div>
  );
};

export default FileUpload;
