import React, {Component} from 'react';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Hand from 'material-ui/svg-icons/action/pan-tool';
import Proyect from 'material-ui/svg-icons/action/extension';
import Wall from 'material-ui/svg-icons/maps/layers';

// From https://github.com/oliviertassinari/react-swipeable-views









class UserNav extends Component{

  constructor(){

    super();
    this.state={
      selectedIndex: 0,
    }
  }
  componentWillMount(){
    console.log(this.props.can)
  }
  select = (index) => this.setState({selectedIndex: index});
componentWillReceiveProps(nextProps) {
  console.log(nextProps.can)
  this.setState({can:nextProps.can})
}
  render(){
    return(
      <div >
         <Paper zDepth={1} className="userNav">
         <BottomNavigation selectedIndex={this.state.selectedIndex}>


             <BottomNavigationItem
               label="Muro"
               icon={<Wall/>}
               onTouchTap={() => this.select(0)}
               onClick={() => this.props.history.push('/userprofile/wall')}
             />


           <BottomNavigationItem
              disabled={this.state.can ? false:true}
              label="Proyectos"
              icon={<Proyect/>}
              onTouchTap={() => this.select(1)}
              onClick={() => this.props.history.push('/userprofile/projects')}
            />


             <BottomNavigationItem
               label="Aportes"
               icon={<Hand/>}
               onTouchTap={() => this.select(2)}
               onClick={() => this.props.history.push('/userprofile/inputs')}
             />
       </BottomNavigation>
    </Paper>


      </div>
    );
  }
}



export default UserNav;
