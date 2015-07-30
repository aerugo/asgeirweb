var React = require("react");

var sections = [
    {
        name: "About",
        items: [
            {name: "Hey", key: "hey", selected: true},
            {name: "No", key: "no", selected: false},
            {name: "Way", key: "way", selected: false}
        ]
    },{
        name: "People",
        items: [
            {name: "Bragi", key: "bragi", selected: false}
        ]
    },{
        name: "Projects",
        items: [
            {name: "Goose hunt", key: "goose-hunt", selected: false}
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
                                                active={this.props.activeItem===item.key}
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
        this.props.onChildClick(this.props.item.key);
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

// Content

var Content = React.createClass({
    render(){
        // var content = <div id="htmlcontent"></div>;
        // $( "#htmlcontent" ).load(this.props.data);
        // console.log("Content: " + this.props.data);
        return (
            <iframe className="content-frame" src={this.props.data}></iframe>
        );
    }
});

// Main panel

var MainContainer = React.createClass({

    getInitialState: function() {
        return {
            activeItem: "hey"
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
                    <div className="col-md-6 col-sm-6" >
                        <Content data={this.state.activeItem + ".html"} />
                    </div>
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
                <div><MainContainer /></div>
            </div>
        )
    }
});



React.render(<App/>, document.getElementById('app-container'));