import { Component } from 'react';
import axios from 'axios';
class PingComponent extends Component {
    constructor() {
        super();
        this.state = {
            pong: 'pending',
        }
    }
    componentDidMount() {
        axios.get('/api/ping')
            .then(({data}) => {
                if (data.error) throw data.error
                this.setState(() => { 
                    return { pong: data.message }
                });
            })
            .catch(err => {
                console.log("error: ", err);
            })
    }

    render() {
        return <h1>Ping {this.state.pong}</h1>;
    }

}
export default PingComponent;