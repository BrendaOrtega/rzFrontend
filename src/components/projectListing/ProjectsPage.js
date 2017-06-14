import React, { Component } from 'react';
import ListingNavBar from './ListingNavBar';
import MainList from './MainList';
import AppBar from 'material-ui/AppBar';
import api from '../../Api/Django';
import toastr from 'toastr';
import _ from 'lodash';



class ProjectsPage extends Component{

    state = {
        search: null,
        category: null,
        ancho: document.documentElement.clientWidth < 600,
        items: [
                {
                    id:1,
                    name:'perro'
                },
                {
                    id:2,
                    name:'gato'
                },
                {
                    id:3,
                    name:'perico'
                },
                {
                    id:4,
                    name:'salchicha'
                },
                {
                    id:5,
                    name:'hocho'
                },
                {
                    id:6,
                    name:'pizza'
                },
                {
                    id:7,
                    name:'brendi'
                },
                {
                    id:8,
                    name:'morro'
                },

            ]
    };


    changeCategory = (value) => {
        this.getAll()
            .then(
                ()=>{

                    if(value){
                        const {items} = this.state;
                        const cat = value;
                        // const newArray = _.sortBy(items, 'category', function(i){
                        const newArray = items.filter(function(i){
                            return i.category[0].slug === cat
                        });
                        this.setState({items:newArray});



                    }
                }
            );



    };


    componentWillMount(){
        this.getAll();
    }

    getAll = () =>{
        return api.getAxiosAllProjects()
            .then(r=>{
                this.setState({items:r.data});
            })
            .catch(e=>toastr.error('no se puedieron cargar los proyectos'));
    };

    provisionalLink = (id) => {
        this.props.history.push('/detail/'+id);
    };

    onChangeSearch = (e) => {
        console.log(e.target.value);
      this.setState({
          search: e.target.value
      });
    };

    render(){
        const regEx = new RegExp(this.state.search,'g');
        const items = this.state.items.filter(
            item=>{
                if(this.state.search) return regEx.test(item.name);
                return item;
            }
        );
        return(
            <div>
                {!this.state.ancho ? <ListingNavBar
                        history={this.props.history}
                        onChangeSearch={this.onChangeSearch}
                        changeCategory = {this.changeCategory}
                    /> : <MiniNav/> }
                <MainList
                    provisionalLink={this.provisionalLink}
                    items={items}/>
            </div>
        );
    }
}

const MiniNav = () => (
    <AppBar
        title="Explorar"
        iconElementLeft={<span></span>}
    />
);

export default ProjectsPage;