var React = require("react");

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
        console.log("Active item: " + this.props.activeItem);
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
        console.log(this.props.item.name + ": active=" + this.props.active + " class=" + className);
        return (
            <div className={className} onClick={this.handleClick}>{this.props.item.name}</div>
        );
    }
});

var Accordion = React.createClass({
    getInitialState: function() {
        return {
            openSection: null,
            activeItem: "Hey"
        };
    },

    onChildClick: function(itemName) {
        this.setState({
            activeItem: itemName
        });
        console.log("Accordion activeItem: " + this.state.activeItem);
    },

    render: function() {
        return (
            <div className="main">
                {this.props.sections.map(function(section) {
                    return <Section key={section.name}
                                    section={section}
                                    onChildClick={this.onChildClick}
                                    activeItem={this.state.activeItem}/>
                }.bind(this))}
            </div>
        );
    }
});

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
            {name: "Cakewalk", key: "Cakewalk", selected: false},
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

React.render(<Accordion sections={sections} />, document.getElementById('accordion'));