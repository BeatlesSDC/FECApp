import React from 'react';
import ReactDOM from 'react-dom';
import ModalTableRows from './ModalTableRows.jsx';
import axios from 'axios';

class RelatedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentProdStyles: null,
      selectedProdStyles: null,
      commonCharacteristics: [],
      key: null
    }
  }

  componentDidMount() {
    this.setState({
      parentProdStyles: this.props.parentStyle,
      selectedProdStyles: this.props.selectedStyle,
      key: this.props.key
    });
  }

  render() {
    if (!this.props.show) {
      return null;
    } else {
      return(
        <div className="relModal" id="modal">
          <div className="modalToggle">
            <img onClick={this.props.handleClose} className="toggle-button" src="https://img.icons8.com/windows/32/000000/macos-close.png"/>
            <div id="modalHeader">
              COMPARING
            </div>
          </div>
          <div className="tableCont">
            <ModalTableRows pStyles={this.props.parentStyle} sStyles={this.props.selectedStyle} pReviews={this.props.parentReview} sReviews={this.props.selectReview} selectProd={this.props.selected} parentProd={this.props.parentProd}/>
          </div>
        </div>
      );
    }
  }
}

export default RelatedModal;