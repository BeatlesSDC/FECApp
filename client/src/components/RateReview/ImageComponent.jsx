import React from "react";

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    isOpen: false,
    photo: props.photo
  };
  this.handleShowDialog = this.handleShowDialog.bind(this);
}

  handleShowDialog() {
    this.setState({ isOpen: !this.state.isOpen });
    console.log("clicked");
  };

  render() {
    return (
      <div >
        <img
          className="imgContainer"
          src={this.state.photo.url}
          onClick={this.handleShowDialog}
          alt="no image"
        />
        {this.state.isOpen && (
          <dialog
            className="dialog"
            style={{ position: "absolute" }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image"
              src={this.state.photo.url}
              onClick={this.handleShowDialog}
              alt={this.state.photo.id}
            />
            <form method="dialog">
              <button>Close</button>
            </form>
          </dialog>
        )}
      </div>
    );
  }
}

export default ImageComponent;