import React from "react";
import Popover from 'devextreme-react/popover';
import "./Activities.css"

const position = {
    offset: '0, 2',
    at: 'bottom',
    my: 'top',
    collision: 'fit flip',
  };

class Activity extends React.PureComponent {


    constructor(props) {
        super(props);
    
        this.show = this.show.bind(this);
        this.renderAgentDetails = this.renderAgentDetails.bind(this);
    }


    render() {
        const { Activity } = this.props;
        return (
          <div>
            <div onClick={this.show} className="item-content">
    
              <img src="logo.png" />
    
              <div className="item-options">
                <div>
                  <div className="address">{Activity.authorId}</div>
                  <div className="price large-text">{Activity.title}</div>
                  <div className="agent">
                    <div id={`house${Activity.id}`}>
                      <img src="DefualtProfile.png" />
                                        Listing agent
                    </div>
                  </div>
                </div>
              </div>
              <Popover
                showEvent="mouseenter"
                hideEvent="mouseleave"
                position={position}
                target={`#house${Activity.id}`}
                width={260}
                contentRender={this.renderAgentDetails}
              />
            </div>
          </div>
        );
    }


    show() {
        this.props.show(this.props.Activity);
    }

    renderAgentDetails() {
        const tags = this.props.Activity.tags;

        const tagsN = tags.map((tag) => 
          <li>{tag}</li>
        )
        return (
          <div className="agent-details">
            <img src="DefualtProfile.png" />
            <div>
              <div className="name large-text">{}</div>
              <div className="phone">tags: 
                <ul>{tagsN}</ul>
              </div>
            </div>
          </div>
        );
    }
}

export default Activity;