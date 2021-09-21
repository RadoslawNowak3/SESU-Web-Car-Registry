import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import DatePicker from "react-datepicker";
function MOTForm() {

    const location = useLocation();
    const [files,setFiles]=useState([]);
    const [desc,setDesc]=useState('');
    const [name,setName]=useState('')
    const [date, setDate] = useState(new Date());
    async function fileChange(e)
    {
        await setFiles(e.target.files)
    }
    async function saveMOT(e)
    {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.set('desc', desc);
            formData.set('name',name);
            formData.set('date',date);
            for(let i=0;i<files.length;i++)
            {
               formData.append('files', files[i]);
            }
           await axios({
                url: "http://localhost:5001/car/mot/" + location.state,
                method: "PUT",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function(res){
                console.log(res);
            })
            /*
            await axios({
                url: "https://mern-sesu.herokuapp.com/car/mot/" + location.state,
                method: "PUT",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function(res){
                console.log(res);
            })
            */
        }
        catch (err)
        {
            console.log(err);
        }
    }

return(
    <Container>
        <Form onSubmit={saveMOT} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label><strong>Entry name</strong></Form.Label>
                <Form.Control type="name"
                              placeholder="MOT/repair no. x"
                              value={name}
                              onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label><strong>Description</strong></Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Describe the entry"
                    style={{ height: '100px' }}
                    onChange = {(e)=>setDesc(e.target.value)}
                />
            </Form.Group>
            <Form.Label><strong>Attach scans of documents (image form)</strong></Form.Label>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Control type="file" multiple onChange={(e)=>fileChange(e)}/>
            </Form.Group>
            <p><strong>MOT/repair date</strong></p>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
            <p></p>
            <Button type="submit">Submit</Button>
        </Form>
        </Container>
    );
}
export default MOTForm;