var React = require("react"),
    ReactDOM = require("react-dom"),
    RouterMixin = require("react-mini-router").RouterMixin;


var currentPath = "current";
var currentLanguage = "en";

var sections = [
    {
        language: "en", key: "en",
        sections: [
            {
            name: "About", key: "about-section",
            items: [
                {name: "Current projects", key: "current"},
                {name: "About Ásgeir", key: "asgeir"},
                    ]
            }, {
                name: "Research", key: "research-section",
                items: [
                    {name: "Cancer and palliative care", key: "cancer"},
                    {name: "Prevention", key: "prevention"},
                    {name: "Collaborators", key: "collaborators"}
                ]
            }
        ]
    },
    {
        language: "sv", key: "sv",
        sections: [
            {
                name: "Om oss", key: "about-section",
                items: [
                    {name: "Pågående projekt", key: "current"},
                    {name: "Om Ásgeir", key: "asgeir"},
                ]
            }, {
                name: "Forskning", key: "research-section",
                items: [
                    {name: "Cancer och vård i livets slutskede", key: "cancer"},
                    {name: "Prevention", key: "prevention"},
                    {name: "Samarbetspartners", key: "collaborators"}
                ]
            }
        ]
    },
    {
        language: "is", key: "is",
        sections: [
            {
                name: "Um okkur", key: "about-section",
                items: [
                    {name: "Núverande verkefni", key: "current"},
                    {name: "Um Ásgeir", key: "asgeir"}
                ]
            }
        ]
    }
];

var Header = React.createClass({
    render(){
        return (
            <div>
                <div className="row header">
                    <div className="col-lg-2 col-md-1 hidden-sm hidden-xs"></div>
                    <div className="col-lg-10 col-md-11 col-sm-12 col-xs-12" id="title"><h1>Ásgeir R. Helgason Research Network</h1></div>
                </div>
                <div className="row"></div>
            </div>
        );
    }
});

var Footer = React.createClass({
    render(){
        return (
            <div>
                <div className="row"></div>
                <div className="row footer"></div>
            </div>
        );
    }
});

// Sidebar menu

var Section = React.createClass({
    /*
    handleClick: function(){
        this.setState({
            open: !this.state.open,
            class: this.state.open ? "section" : "section open"
        });
    },
     */
    getInitialState: function(){
        if(this.props.section.key != ""){
            return {
                open: true,
                class: "section open"
            }
        } else {
            return {
                open: false,
                class: "section"
            }
        }
    },
    render: function() {
        return (
            <div className={this.state.class}>
                <div className="section-head" onClick={this.handleClick}>{this.props.section.name}</div>
                <div className="article-wrap">
                    <div className="article">
                        {this.props.section.items.map(function(item) {
                            return <SectionItem key={item.name}
                                                item={item}
                                                type={"section_item"}
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
        this.props.onChildClick(this);
        currentPath = this.props.item.key;
        console.log(currentPath);
    },
    render: function() {
        var className = this.props.item.key == currentPath ? "section-item active" : "section-item";
        return (
            <a className="menu-link"
               href={"#!/page/" + currentLanguage + "/" + this.props.item.key}>
                <div className={className} onClick={this.handleClick}>
                    {this.props.item.name}
                </div>
            </a>
        );
    }
});

var Accordion = React.createClass({
    render: function() {
        var these_sections = null;
        sections.map(function(section) {
            if(section.language == this.props.language) {
                these_sections = section.sections;
            }
        }.bind(this));

        return (
            <div className="menu">
                {these_sections.map(function(section) {
                    return <Section key={section.key}
                                    section={section}
                                    onChildClick={this.props.onChildClick}
                                    activeItem={this.props.activeItem}/>
                }.bind(this))}
            </div>
        );
    }
});

var LanguageItem = React.createClass({
    handleClick: function(){
        this.props.onChildClick(this);
        currentLanguage = this.props.code;
    },
    render(){
        var className = this.props.code == currentLanguage ? "sidebar-link-item active" : "sidebar-link-item";
        return (
            <a className="menu-link"
               href={"#!/page/" + this.props.code + "/" + currentPath}>
                <div className={className} onClick={this.handleClick}>{this.props.name}</div>
            </a>
        );
    }
});

var LanguageChooser = React.createClass({
    render(){
        var title = "Language";
        var languages = [
            {name: "English", key: "en", title: "Language"},
            {name: "Svenska", key: "sv", title: "Språk"},
            {name: "Íslenska", key: "is", title: "Tungumál"}
        ];
        languages.map(function(language) {
            if(language.key == currentLanguage) {
                title = language.title;
            }
        }.bind(this));
        return (
            <div className="sidebar-box">
                <div className="sidebar-header">{title}</div>
                {languages.map(function(item) {
                    return <LanguageItem
                        key={item.key}
                        name={item.name}
                        code={item.key}
                        onChildClick={this.props.onChildClick}
                        type="language" />
                }.bind(this))}
            </div>
        );
    }
});

var ContactChooser = React.createClass({
    render(){
        var title = "Contact";
        var languages = [
            {name: "English", code: "en", title: "Contact", key: "contact-en"},
            {name: "Svenska", code: "sv", title: "Kontakt", key: "contact-sv"},
            {name: "Íslenska", code: "is", title: "Hafðu samband", key: "contact-is"}
        ];
        languages.map(function(language) {
            if (language.code == currentLanguage) {
                title = language.title;
            }
        });
        var sites = [
            {name: "Karolinska Institutet", url: "http://ki.se/en/people/asghel", key: "site-ki"},
            {name: "Reykjavik University", url: "http://en.ru.is/the-university/faculty-and-staff/asgeirr", key: "site-ru"},
            {name: "ResearchGate", url: "https://www.researchgate.net/profile/Asgeir_Helgason2", key: "site-rg"},
            {name: "LinkedIn", url: "https://se.linkedin.com/pub/asgeir-r-helgason/56/644/2a2", key: "site-li"}
        ];
        return(
            <div className="sidebar-box">
                <div className="sidebar-header">{title}</div>
                {sites.map(function(item) {
                    return (<a className="menu-link"
                               target="_blank"
                               key={item.key}
                               href={item.url}>
                            <div className="sidebar-link-item sidebar-link-site">{item.name}</div>
                            </a>)
                }.bind(this))}

            </div>
        );
    }
});

// Main panel

var MainContainer = React.createClass({

    getInitialState: function() {
        return {
            activeItem: this.props.activeItem,
            language: this.props.language
        };
    },

    onChildClick: function(object) {
        if(object.props.type == "section_item") {
            this.setState({
                activeItem: object.props.item.key
            });
            $( "#html-content" ).load("content/pages/" + this.state.language + "/" + object.props.item.key + ".html");
        }
        if(object.props.type == "language") {
            this.setState({
                language: object.props.code
            });
            $( "#html-content" ).load("content/pages/" + object.props.code + "/" + this.state.activeItem + ".html");
        }
    },

    render(){
        return (
            <div>
                <Header />
                <div className="row main-container">
                    <div className="col-lg-2 col-md-1 hidden-sm hidden-xs"></div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 accordion">
                        <Accordion
                            onChildClick={this.onChildClick}
                            activeItem={this.state.activeItem}
                            language={this.state.language}/>
                        <LanguageChooser
                            onChildClick={this.onChildClick}/>
                        <ContactChooser/>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 content" >
                        <div id="html-content"></div>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});

// App

var App = React.createClass({

    routes: {
        "/": "home",
        "/page/:language/:id": "page"
    },

    mixins: [RouterMixin],

    render(){
        return (
            <div className="container-fluid app-container">
                {this.renderCurrentRoute()}
            </div>
        )
    },

    componentDidMount() {
        $( "#html-content" ).load("content/pages/" + currentLanguage + "/" + currentPath + ".html")
    },

    home: function() {
        currentPath = "current";
        return(
        <div className="container-fluid app-container">
            <div><MainContainer language="en" activeItem="current"/></div>
        </div>
        )
    },

    page: function(language, id) {
        currentPath = id;
        currentLanguage = language;
        return(
            <div className="container-fluid app-container">
                <div><MainContainer language={language} activeItem={id}/></div>
            </div>
        )
    }

});

module.exports = App;

ReactDOM.render(<App/>, document.getElementById('app-container'));
$(window).on('hashchange', function() {
    $( "#html-content" ).load("content/pages/" + currentLanguage + "/" + currentPath + ".html")
});