import React, { Component } from 'react';

class InfoBlock extends Component {

    render() {
        const {data} = this.props;

        return (
            <div>
                <div className="col-md-4">
                    <img src="#" width="500" height="300px" alt="img"/>
                </div>
                <div className="col-md-8">
                    DESCRIPTION
                    {data &&
                    <blockquote>
                        {data.description || ''}
                    </blockquote>
                    }
                </div>
            </div>
        )
    }
}

InfoBlock.propTypes = {
    data: React.PropTypes.object.isRequired
};

export default InfoBlock;