var React = require("react");

var sections = [
    {
        name: "About",
        items: [
            {name: "Hey", key: "Hey", selected: true},
            {name: "No", key: "No", selected: false},
            {name: "Way", key: "Way", selected: false}
        ]
    },{
        name: "People",
        items: [
            {name: "Bragi", key: "Cakewalk", selected: false},
            {name: "George", key: "George", selected: false},
            {name: "Adam", key: "Adam", selected: false}
        ]
    },{
        name: "Projects",
        items: [
            {name: "Pirate raid", key: "Pirate raid", selected: false},
            {name: "Goosehunt", key: "Goosehunt", selected: false}
        ]
    }
];

// Top panel

var TopPanel = React.createClass({
    render(){
        return (
            <div>
                <div className="row top-banner">
                    <div className="col-md-1 hidden-sm hidden-xs"></div>
                    <div className="col-md-8 col-sm-8" id="title"><h1>Ásgeir R. Helgason Research</h1></div>
                    <div className="col-md-2 col-sm-2 top-banner-languages">En Sv Ís</div>
                </div>
                <div className="row"></div>
            </div>
        );
    }
});

// Sidebar menu

var Section = React.createClass({
    handleClick: function(){
        this.setState({
            open: !this.state.open,
            class: this.state.open ? "section" : "section open"
        });
    },
    getInitialState: function(){
        return {
            open: false,
            class: "section"
        }
    },
    render: function() {
        return (
            <div className={this.state.class}>
                <div className="sectionhead" onClick={this.handleClick}>{this.props.section.name}</div>
                <div className="articlewrap">
                    <div className="article">
                        {this.props.section.items.map(function(item) {
                            return <SectionItem key={item.name}
                                                item={item}
                                                onChildClick={this.props.onChildClick}
                                                active={this.props.activeItem===item.name}
                                />
                        }.bind(this))}
                    </div>
                </div>
            </div>
        );
    }
});

var SectionItem = React.createClass({
    handleClick: function(){
        this.props.onChildClick(this.props.item.name);
    },
    getInitialState: function(){
        return {
            active: false,
            class: "sectionitem"
        }
    },
    render: function() {
        var className = this.props.active ? "sectionitem active" : "sectionitem";
        return (
            <div className={className} onClick={this.handleClick}>{this.props.item.name}</div>
        );
    }
});

var Accordion = React.createClass({

    render: function() {
        return (
            <div className="main">
                {this.props.sections.map(function(section) {
                    return <Section key={section.name}
                                    section={section}
                                    onChildClick={this.props.onChildClick}
                                    activeItem={this.props.activeItem}/>
                }.bind(this))}
            </div>
        );
    }
});


// Main panel

var MainContainer = React.createClass({

    getInitialState: function() {
        return {
            activeItem: "Hey"
        };
    },

    onChildClick: function(itemName) {
        this.setState({
            activeItem: itemName
        });
    },

    render(){
        return (
            <div>
                <div className="row main-container">
                    <div className="col-md-1 hidden-sm hidden-xs"></div>
                    <div className="col-md-2 col-sm-3">
                        <Accordion
                            onChildClick={this.onChildClick}
                            sections={sections}
                            activeItem={this.state.activeItem}/>
                    </div>
                    <div className="col-md-6">{this.state.activeItem}</div>
                    <div className="col-md-3 hidden-sm hidden-xs"></div>
                </div>
            </div>
        )
    }
});

// App

var App = React.createClass({
    render(){
        return (
            <div className="container-fluid">
                <div><TopPanel /></div>
                <div><MainContainer/></div>
            </div>
        )
    }
});



React.render(<App/>, document.getElementById('app-container'));


function getRoutes() {
    var route_array = [];
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var section_name = section.name;
        for (var j = 0; i < section.length; j++) {
            route_array.push({section: section_name, item: section[j].name})
        }
    }
}