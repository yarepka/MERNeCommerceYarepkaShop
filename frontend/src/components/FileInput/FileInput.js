import React from 'react';

import './FileInput.css';

const FileInput = (props) => {
  let imageLabel = (
    <label htmlFor='file-upload' className='file-upload-label'>
      <span>Profile Image</span>
    </label>
  );

  if (props.image !== '') {
    let styling;
    if (props.image instanceof File) {
      styling = {
        background: `url(${URL.createObjectURL(
          props.image
        )}) no-repeat center center/cover`,
      };
    } else {
      styling = {
        background: `url(${props.image}) no-repeat center center/cover`,
      };
    }

    imageLabel = (
      <label
        htmlFor='file-upload'
        className='file-upload-label'
        style={styling}
      ></label>
    );
  }

  return (
    <div className='form-group'>
      {imageLabel}
      <input id='file-upload' type='file' onChange={props.imageHandler} />
    </div>
  );
};

export default React.memo(FileInput);
