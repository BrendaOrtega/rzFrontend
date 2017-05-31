import React, { Component } from 'react';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import {cyan500} from 'material-ui/styles/colors';
import ReactMarkdown from 'react-markdown';
import { RaisedButton, ToolbarGroup } from 'material-ui';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ActionSettingsEthernet from 'material-ui/svg-icons/action/settings-ethernet';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';




class DescriptionPage extends Component{

    state = {
        input: '# cochinon\n\n>cita loquilla\n\n![bliss](http://localhost:3000/static/media/bliss.06322ec7.jpg)\n\n<ul>\n<li>chet</li>\n</ul>\n\n* pollo rojo\n\n* pollo verde \n\n* pollo azul\n\n> simplemente quote\n\n**ño morro**\n\nwhat about simple paragraph??',
        selectedIndex: 0,
        ancho: document.documentElement.clientWidth < 600,
        desapareceMark: '',
        desaparecePrev: ''

    };

    select = (index) => this.setState({selectedIndex: index});


    onChange = (e) => {
       this.setState({
           input: e.target.value
       });
    };

    componentDidMount(){

        let s1= document.getElementById('Select1');
        let s2= document.getElementById('Select2');

        function select_scroll_1(e) { s2.scrollTop = s1.scrollTop; //console.log(s1.scrollTop);
             }
        function select_scroll_2(e) { s1.scrollTop = s2.scrollTop; //console.log(s2.scrollTop);
             }


        s1.addEventListener('scroll', select_scroll_1, false);
        // s2.addEventListener('scroll', select_scroll_2, false);
        // desaparecemos el preview en mobiles
        if(this.state.ancho) this.setState({desaparecePrev: 'desaparece'})


    }

    render(){

        const {input} = this.state;

        return(
            <div >
                <Toolbar
                    style={{
                        backgroundColor:cyan500,
                        marginBottom:0}}>
                    <ToolbarTitle
                        style={{color:'white'}}
                        text="Descripción de tu proyecto" />
                    <ToolbarGroup>
                        <RaisedButton label="Guardar" secondary={true}/>
                    </ToolbarGroup>
                </Toolbar>

                <div className="desc-container">

                    <div
                        className={"desc-editor " + this.state.desapareceMark}

                    >
                       <textarea
                           id="Select1"
                           value={this.state.input}
                           onChange={this.onChange} name="input" cols="30" rows="10">

                       </textarea>

                    </div>
                     <br/>
                    <div
                        id="Select2"
                        className={"mark desc-preview " + this.state.desaparecePrev}>
                        <ReactMarkdown
                            id="mijo"
                            style={{color:'red'}}
                            source={input} />
                    </div>


                </div>




                {/*Switch de visibilidad si mobile*/}
                {this.state.ancho && <Paper
                    style={{
                        position:'fixed',
                        bottom:0,
                        width:'100%'
                    }}
                    zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Markdown"
                            icon={<ActionSettingsEthernet/>}
                            onTouchTap={() => {
                                this.select(0);
                                this.setState({
                                    desaparecePrev: 'desaparece',
                                    desapareceMark:''
                                });
                            }}
                        />
                        <BottomNavigationItem
                            label="Preview"
                            icon={<ActionVisibility/>}
                            onTouchTap={() =>{
                                this.select(1);
                                this.setState({
                                    desapareceMark:'desaparece',
                                    desaparecePrev: ''
                                });
                            }}
                        />
                    </BottomNavigation>
                </Paper>}


            </div>

        );
    }
}

export default DescriptionPage;