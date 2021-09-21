import React from 'react';
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Gallery from "react-dynamic-image-gallery";
function MOTInstance({singleMOT})
{
    function makeContainer() {
        let instancedate = singleMOT.date.substring(0,10);
        let imagearray = [];
        singleMOT.img.forEach((image,imgindex)=>
        {
            imagearray.push({id:imgindex+1,path:image})
        }
        )
        return (
            <Row>
                <Col xs={6}>
                    <div className="wrapper">
                        <Gallery
                            source={imagearray}
                            itemsToShow={3}
                            itemsToShowInPreview={5}
                        />
                    </div>
                </Col>
                <Col xs={6}>
                  <p><strong> {singleMOT.name}</strong></p>
                    {singleMOT.desc}
                    <p></p>
                    <strong>Date: </strong> {instancedate}
                </Col>
            </Row>
        )
    }
    return(
        <Container>
            {console.log(singleMOT)}
            {singleMOT ? makeContainer() : null}
        </Container>
    )

}
export default MOTInstance;