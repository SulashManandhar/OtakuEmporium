import React, {useState} from 'react';
import axios from 'axios'
import '../../stylesheets/apparel.css'

export const AddApparel = () => {

    //States
    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose File');
    const [uploadedFile,setUploadedFile] = useState({});


    //OnChange update filename
    const onChange = e =>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name); 
        console.log(`Filename:${filename}`);
      };
  
      //SUbmitting Image
      const onSubmit = async e =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
  
        try{
          const res = await axios.post('http://localhost:4600/uploads', formData,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          });
  
          const {fileName, filePath} =res.data;
          setUploadedFile({fileName, filePath});
          console.log("File Uploaded")
        }catch(err){
          if(err.response.status === 500){
            console.log("Error with the server");
          }else{
            console.log(err.response.data.msg);
          }
        }
      }

    

    return (
        <>
            <div>
                <span className='header'>Add a apparel</span>
                <hr/>
            </div>

            <form onSubmit={onSubmit}>
                <div className="custom-file mb-3">
                    <input className="form-control" type="file" id="formFile" onChange={onChange} />
                    <label htmlFor="formFile" className="label">{filename}              
                    </label>
                </div>
                <input type="submit" value="Upload"  className='btn btn-primary btn-block'/>
            </form>
        </>

    )
    
};
export default AddApparel;
