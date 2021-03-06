// @flow
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Dropzone from 'react-dropzone';
import { uploadFile } from '/imports/api/openUploads';
import { uuid, A } from 'frog-utils';

const onDrop = (file, setConfigData) => {
  const fr = new FileReader();
  fr.onloadend = loaded => {
    const imageBuffer = Buffer.from(loaded.currentTarget.result);
    const id = uuid();
    uploadFile(imageBuffer, id).then(() => {
      Meteor.call('h5p.unzip', id, (err, succ) => {
        if (err || succ === -1) {
          // eslint-disable-next-line no-alert
          window.alert('Package has wrong format, or could not be installed.');
        } else {
          setConfigData({ fileId: id });
        }
      });
    });
  };
  fr.readAsArrayBuffer(file[0]);
};

const ConfigComponent = ({
  configData = {},
  setConfigData
}: {
  configData: Object,
  setConfigData: Object => void
}) => (
  <div style={{ marginTop: '20px' }}>
    {configData.component.fileId ? (
      <div>
        <h1>H5P package uploaded successfully</h1>
        <A onClick={() => setConfigData({})}>Remove file</A>
        <hr />
      </div>
    ) : (
      <Dropzone
        onDropAccepted={file => onDrop(file, setConfigData)}
        style={{
          width: '50%',
          border: '2px dashed rgb(102, 102, 102)',
          borderRadius: '5px',
          padding: '10px',
          minWidth: 'fit-content'
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <div style={{ textAlign: 'center' }}>
              <input {...getInputProps()} />
              <h3>Drop H5P package here / Click to upload</h3>
            </div>
          </div>
        )}
      </Dropzone>
    )}
  </div>
);

export default ConfigComponent;
