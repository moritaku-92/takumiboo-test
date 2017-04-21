import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import * as Actions from '../actions/WaitTime'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import LoadingModal from '../components/LoadingModal'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/redo';

const style = {
  position: "fixed",
  bottom: "10px",
  right: "10px"
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentWillMount() {
    const {actions} = this.props
    actions.getWaitTime()
  }
  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  }

  render() {
    console.log('## App');
    const {actions,waitTime} = this.props
    var outputData = []
    if (waitTime.isFetching) {
      outputData = <LoadingModal/>
    } else {
      this
        .props
        .waitTime
        .data
        .forEach((element, index) => {
          var outputData2 = []
          element
            .attractions
            .forEach((element2, index2) => {
              outputData2.push(
                <Card>
                  <CardHeader title={element2.name} subtitle={element2.status}/>
                  <CardText >
                    営業時間 : {element2.runtime}<br/>
                    待ち時間 : {element2.time}<br/>
                    ファストパス : {element2.fp}
                  </CardText>
                </Card>
              )
            })
          outputData.push(
            <Card >
              <CardHeader
                title={element.themeport}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                {outputData2}
              </CardText>
            </Card>
          )
        })
    }

    return (
      <div>
        <AppBar
          style={{
          paddingLeft: '0',
          position: "fixed"
        }}
          title="Where Dreams Come True"
          showMenuIconButton={false}
        />
        <div style={{
          paddingTop: 75
        }}
        >
          {outputData}
          <FloatingActionButton style={style}
            onTouchTap={()=>actions.getWaitTime()}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {waitTime} = state
  return {waitTime}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, Actions), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
