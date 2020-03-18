import React,{Component} from 'react';

const setting = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    mode: 'cors',
    cache: 'default'
}

class Reqtest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedID: "1",
            isFetching: false,
            result:[],
            model:"no-cors",
            errorMessage: '',
        }
    }
    componentDidMount() {
        fetch(`https://xuegong.twtstudio.com/api/index/nav`, setting)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log("数据:" + data)
                this.setState({
                    result: data.data
                })
            })
            .catch(e => console.log('错误码:', e))
    }
    render(){
        return(
            <p>{this.state.result}</p>
        )
    }
}

export default Reqtest