import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay,Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row, Col} from 'reactstrap';
import { DISHES } from '../shared/dishes';
import { Link } from 'react-router-dom';


import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);



class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCommentFormModalOpen: false
        }

        this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this)
        this.handleCommentFormSubmit  = this.handleCommentFormSubmit.bind(this)

    };

   handleCommentFormSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current state is " + JSON.stringify(values));
   }

   toggleCommentFormModal() {
     this.setState({
        isCommentFormModalOpen: !this.state.isCommentFormModalOpen
     })
   }



   render() {
      return(
        <>
          <Button outline onClick= {this.toggleCommentFormModal}>
            <span className='fa fa-comments fa-lg'></span> Submit Comment
          </Button>
          <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal}>
                <ModalHeader toggle={this.toggleCommentFormModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <localForm onSubmit={(values) =>this.handleCommentFormSubmit(values)}>\
                    <Row className='form-group'>
                        <Label htmlFor='rating' md={12}>Rating</Label>
                         <Col md={12}>

                            <Control.select model=".rating" className="form-control" name="rating" id="rating" validators={{required}}>
                                
                            <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                            </Control.select>
                            <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                        />
                         </Col>

                    </Row>
                       {/* author */}
                       <Row className="form-group">
                                <Label htmlFor="author" md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>




                            {/* comment */}
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>

                            </Row>

                            {/* submit button */}
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                    </Col>
                            </Row>


                </localForm>
            </ModalBody>

            
          </Modal>
        </>
      )
   }
}


   function RenderDish({dish}) {

        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments}){
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment=> {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            
            <div className='col-12 col-md-5 m-1'>
                <h3> Comments </h3>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>

            </div>
        )
    }


   const DishDetail=(props)=>{
        const dish = props.dish


        
        if (dish == null) {
            return (<div></div>);
        }

        const dishItem =<RenderDish dish={props.dish} />;
        const dishComment = <RenderComments comments={props.dish.comment}/>;

        return (
            <div className="container">
            <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
            <div className='row'>
                {dishItem}
                {dishComment}
            </div>
            </div>
        )
    }



export default DishDetail;



















































