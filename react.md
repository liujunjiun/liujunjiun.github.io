
 ##React 元素
###ReactNode
> ReactNode 是虚拟 DOM 的基本构建，可以是以下任意一种核心类型

* ReactElement

    它是 React 中的基础类型，是 DOM 中 Element 的一种轻量、无状态、不可变的虚拟表现形式

* ReactText

    它是一个数字或者字符串，它代表了文本内容，是 DOM 中的文本节点的虚拟表示形式

**ReactElement 和 ReactText 都是 ReactNode 。 一个 ReactNode 的数组称为 ReactFragment 。**

<br />

------------------------
<br />

###创建 React 元素
> React 库的入口点是 React 对象

* createElement() 方法

    > React 对象有一个叫做 createElement() 的方法，这个方法有三个参数，type，props，children

        React.createElement(type, props, children)

    看看每一个参数：

    * type 参数

        type 参数必须是一个字符串或者是一个 ReactClass：

        + 如果是字符串，则必须是一个 HTML 标签名

        + ReactClass 是通过 ```React.createClass()``` 方法创建的

                var React = require('react');
                var ReactDom = require('react-dom');

                var reactElement = React.createElement('h1');

                ReactDom.render(reactElement, document.getElementById('react-application'));

    * props 参数

        props 参数是一个 JavaScript 对象，它会被从父元素传递到子元素，它具有一些不可变的属性

        当我们通过 React 来创建 DOM 元素时，可以通过 props 对象的属性来传递表示 HTML 的属性，如 class 、 style 等。

            var React = require('react');
            var ReactDom = require('react-dom');

            var reactElement = React.createElement('h1', {className: 'header'});

            ReactDom.render(reactElement, document.getElementById('react-application'));

    * children 参数

        children 参数描述了这个元素应当含有的子元素。子元素可以是任何类型的 ReactNode ，例如 ReactElement 表示的虚拟 DOM 元素、由 ReactText 表示的字符串或数字，或者 ReactFragment ，即多个 ReactNode 的数组。

            var React = require('react');
            var ReactDom = require('react-dom');

            var reactElement = React.createElement('h1', {className: 'header'},'这是ReactText');

            ReactDom.render(reactElement, document.getElementById('react-application'));

        ReactFragment 里的每个 ReactElement 必须有一个 key 属性，用来帮助 React 识别不同的 ReactElement 。

            var React = require('react');
            var ReactDom = require('react-dom');

            var h1 = React.createElement('h1', {className: 'header', key: 'header'}, '这是React');
            var p = React.createElement('p', {className: 'content', key: 'content'}, "这里是如何工作的");

            var reactFragment = [h1, p];

            var section = React.createElement('section', {className: 'container'}, reactFragment);

            ReactDom.render(section, document.getElementById('react-application'));


* createFactory() 方法

    React 提供了一个名为 React.createFactory() 的工厂函数，通过这个工厂函数可以创建多个同一类型的 React 元素

    > ** 注意： ** React.createFactory() 和 React.createElement() 是一样的，都可以传入 HTML 标签字符串（如 li）或者 ReactClass 对象类型的参数

        var React = require('react');
        var ReactDom = require('react-dom');

        var createListItemElement = React.createFactory('li');

        var ListItemElement1 = createListItemElement({className: 'item-1', key: 'item-1'}, "item-1");
        var ListItemElement2 = createListItemElement({className: 'item-2', key: 'item-2'}, "item-2");
        var ListItemElement3 = createListItemElement({className: 'item-3', key: 'item-3'}, "item-3");

        var reactFragment = [ListItemElement1, ListItemElement2, ListItemElement3];

        var listOfItems = React.createElement('ul', {className: 'list-of-itens'}, reactFragment);

        ReactDom.render(listOfItems, document.getElementById('react-application'));


* React.DOM 对象

    React 提供了一些内置的工厂函数来创建通用的 HTML 标签，可以在 React.DOM 对象下调用它们，例如 ```React.DOM.ul()``` 、 ```React.DOM.li()``` 、 ```React.DOM.div()``` 等。

        var React = require('react');
        var ReactDom = require('react-dom');

        var ListItemElement1 = React.DOM.li({className: 'item-1', key: 'item-1'}, "item-1");
        var ListItemElement2 = React.DOM.li({className: 'item-2', key: 'item-2'}, "item-2");
        var ListItemElement3 = React.DOM.li({className: 'item-3', key: 'item-3'}, "item-3");

        var reactFragment = [ListItemElement1, ListItemElement2, ListItemElement3];

        var listOfItems = React.DOM.ul({className: 'list-of-itens'}, reactFragment);

        ReactDom.render(listOfItems, document.getElementById('react-application'));
    
    ReactDOM.findDOMNode() 获取到组件中真实的DOM。
    ReactDOM.findDOMNode() 只在mounted组件中调用，mounted组件就是已经渲染在浏览器DOM结构中的组件。


<br />

------------------------
<br />


###渲染 React 元素
> ReactDom.render() 将我们的 ReactNode 树渲染成 DOM

    ReactDom.render(ReactElement, DOMElement, callback);

* ReactElement 是你已经创建的 ReactNode 树中的根节点

* DOMElement 是这个树的容器 DOM 节点

* callback 函数监会在这个树渲染或者更新之后执行


<br />

------------------------
<br />


###在服务器上更新 DOM
> 虚拟 DOM 只依赖 JavaScript ，而 Node.js 可以在服务器上运行 JavaScript ，所以我们可以在服务器端使用 React 库，并且创建 ReactNode 树。

* 将 ReactNode 树渲染成字符串 ```ReactDOMServer.renderToString(ReactElement)```

    它会接收一个 ReactElement 作为参数，冰渲染出初识的 HTML ，这不仅比在客户端渲染 DOM 快，而且能改善 WEB 应用程序的搜索引擎优化（SEO）效果

        var ReactDOMServer = require('react-dom/server');
        ReactDOMServer.renderToString(ReactElement);

* 生成静态页面 ```ReactDOMServer.renderToStaticMarkup(ReactElement)```

        var ReactDOMServer = require('react-dom/server');
        ReactDOMServer.renderToStaticMarkup(ReactElement);

    这个方法也需要一个 ReactElement 作为参数输出一个 HTML 字符串。但是它不会创建 React 内部使用的额外的 DOM 属性，它只会生成更短的 HTML 字符串，方便我们快速传输


<br />

------------------------
<br />

###使用 JSX 来创建 React 元素
> JSX 允许我们在 JavaScript 代码中使用类似 HTML 的语法，我们可以清晰的看到渲染后的 HTML 布局结构。

    var React = require('react');
    var ReactDom = require('react-dom');
    
    var listOfItems =   <ul className="list-of=items">
                            <li className="item1">item1</li>
                            <li className="item2">item2</li>
                            <li className="item3">item3</li>
                        </ul>;
    
    ReactDom.render(listOfItems, document.getElementById('react-application'));


<br />

------------------------
<br />

##创建React组件
####创建第一个无状态 React 组件

    var React = require('react');
    var ReactDom = require('react-dom');

    var ReactClass = React.createClass({
        render: function(){
            return React.createElement('h1', {className: 'header'},'这是 React 组件');
        }
    });

    var createComponentElement = React.createElement(ReactClass);

    var reacteComponent = ReactDom.render(createComponentElement, document.getElementById('react-application'));


* React 组件需要最基本的一个 render() 方法，它至少会返回 ```null``` 或者 ```false```

        {
            render: function(){
                return null;
            }
        }

* render() 函数负责告诉 React 怎样渲染这个 React 组件。它可以是 ```null``` ，也可以返回 ```ReactElement```

        {
            render: function(){
                return React.createElement('h1', {className: 'header'}, 'React Component')
            }
        }

* 有了 render() 函数就能在返回值之前选择返回什么值。添加一个判断来决定渲染什么：

        {
            render: function(){
                var elementState = {
                    inHidden: true
                };

                if (elementState.inHidden) {
                    return null;
                }

                return React.createElement('h1', {className: 'header'},'这是 React 组件');
            }
        }

<br />

------------------------
<br />

####创建第一个有状态的 React 组件
> render() 函数唯一的作用是根据传递的数据返回一个 React 元素。使用 React API 有两种方法将数据传递给 render() 函数：

* this.props

    放在 props 对象中的任何数据传递给 React.createElement() 函数后，可以通过 ```this.props``` 在 render() 函数中访问。只要可以从 ```this.props``` 访问到数据，就可以渲染它。

            var React = require('react');
            var ReactDom = require('react-dom');

            var ReactClass = React.createClass({
                render: function(){
                    if (this.props.inHidden) {
                        return null;
                    }

                    return React.createElement('h1', {className: 'header'}, this.props.header);
                }
            });

            var createComponentElement = React.createElement(ReactClass, {inHidden: false, header: '通过 this.props 传递数据'});

            var reacteComponent = ReactDom.render(createComponentElement, document.getElementById('react-application'));

* this.state

    React 把组件的状态保存在 ```this.state``` 中，初始值是 getInitialState() 函数的返回值。这取决于我们告诉 React getInitialState() 函数返回什么。

            var React = require('react');
            var ReactDom = require('react-dom');

            var ReactClass = React.createClass({
                getInitialState: function(){
                    return {
                        inHidden: false
                    }
                },

                render: function(){
                    if (this.state.inHidden) {
                        return null;
                    }

                    return React.createElement('h1', {className: 'header'},'这是 React 组件');
                }
            });

            var createComponentElement = React.createElement(ReactClass);

            var reacteComponent = ReactDom.render(createComponentElement, document.getElementById('react-application'));


> this.props 和 this.data 的区别：

* this.props 存储的是从父级传递过来的只读数据。它属于父级，并且不能被它的子元素改变。这个数据应该被认为是不可改变的。

* this.state 存储的数据是组件私有的。它能被组件修改。当 state 更新后组件会自动重新渲染。


#####更新组件的 state
> React 提供了一个通用方式：使用 ```setState(data,callback)``` 更新 state ，这个函数有两个参数：

* data 函数，表示下一个状态

* callback 函数，很少用到它，因为 React 已经保持了用户界面是最新的。

> 每当更新组件的状态时，React 都会调用组件的 ```render()``` 函数，包括所有子组件在内都会被重新渲染。事实上，每次调用 ```render()``` 函数时它都会重新渲染全部虚拟 DOM 。

&#160; &#160; &#160; &#160;当调用 this.setState() 函数，并向它传递一个表示下一状态的数据对象时，React 将会合并下一个状态和当前状态。在合并过程中，React 会使用下一个状态覆盖当前状态。没有被覆盖的当前状态将成为下一个状态的一部分。

    var React = require('react');
    var ReactDom = require('react-dom');

    var ReactClass = React.createClass({
        getInitialState: function(){
            return {
                isHeaderHidden: false,
                title: '有状态的 React 组件'
            };
        },

        handleClick: function(){
            this.setState({
                isHeaderHidden: !this.state.isHeaderHidden
            })
        },

        render: function(){
            var headerElement = React.createElement('h1', {className: 'header', key: 'header'}, this.state.title);
            var buttonElement = React.createElement('button', {className: 'btn btn-default', onClick: this.handleClick, key: 'button'}, '显示/隐藏');
            if(this.state.isHeaderHidden){
                return React.createElement('div', null, [buttonElement]);
            }

            return React.createElement('div', null, [headerElement, buttonElement]);
        }
    });

    var createComponentElement = React.createElement(ReactClass);

    var reacteComponent = ReactDom.render(createComponentElement, document.getElementById('react-application'));

上面的例子中， state 中的 title 从没有改变过，这引出了一个重要的问题：我们应该在 state 中放什么？

> 组件的 state 应该用来存储组件的事件函数随时可能会改变的数据，以达到重新渲染并保持组件的用户界面最新的目的。
> 
> 将 state 对象中组件状态保持为最小可能表示形式，并在 render() 函数中使用 state 和 props 来计算数据的其余部分。
> 
> 无论在 state 中放了什么，都需要自己更新。而在 render() 函数中放入的内容都会通过 React 自动更新。

    var React = require('react');
    var ReactDom = require('react-dom');

    var ReactClass = React.createClass({
        getInitialState: function(){
            return {
                isHeaderHidden: false
            };
        },

        handleClick: function(){
            this.setState({
                isHeaderHidden: !this.state.isHeaderHidden
            })
        },

        render: function(){
            var title = '有状态的 React 组件';

            var headerElement = React.createElement('h1', {className: 'header', key: 'header'}, title);
            var buttonElement = React.createElement('button', {className: 'btn btn-default', onClick: this.handleClick, key: 'button'}, '显示/隐藏');

            if(this.state.isHeaderHidden){
                return React.createElement('div', null, [buttonElement]);
            }

            return React.createElement('div', null, [headerElement, buttonElement]);
        }
    });

    var createComponentElement = React.createElement(ReactClass);

    var reacteComponent = ReactDom.render(createComponentElement, document.getElementById('react-application'));

<br />

------------------------
<br />

##让 React 组件变得可响应
####创建一个 React 组件容器

    < app.js >
    -----------------------------------------------------------
    var React       = require('react');
    var ReactDom    = require('react-dom');
    var Application = require('./components/Application.react');
    
    ReactDOM.render(<Application />, document.getElementById('react-application'));

<br/>

    < Application.react.js >
    -----------------------------------------------------------
    var React       = require('react');
    var Stream      = require('./Stream.react');
    var Collection  = require('./Collection.react');
    
    var Application = React.createClass({
        getInitialState: function(){
            return {
                collectionTweets: {}
            };
        },
    
        addTweetToCollection: function(){
            var collectionTweets = this.state.collectionTweets;
    
            collectionTweets[tweet.id] = tweet;
    
            this.setState({
                collectionTweets: collectionTweets
            });
        },
    
        removeTweetsFromCollection: function(){
            var collectionTweets = this.state.collectionTweets;
    
            delete collectionTweets[tweet.id];
    
            this.setState({
                collectionTweets: collectionTweets
            });
        },
    
        removeAllTweetsFromCollection: function(){
            this.setState({
                collectionTweets: {}
            });
        },
    
        render: function(){
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <Stream onAddTweetToCollection={this.addTweetToCollection} />
                        </div>
                        <div className="col-md-8">
                            <Collection tweets={this.state.collectionTweets} onRemoveTweetsFromCollection={this.removeTweetsFromCollection} onRemoveAllTweetsFromCollection={this.removeAllTweetsFromCollection} />
                        </div>
                    </div>
                </div>
            );
        }
    });
    
    module.exports = Application;

<br />

    < Stream.react.js >
    -----------------------------------------------------------
    var React                = require('react');
    var SnapkiteStreamClient = require('snapkite-stream-client');
    var StreamTweet          =require('./StreamTweet.react');
    var Header               = require('./Header.react');
    
    var Stream = React.createClass({
        getInitialState: function(){
            return {
                tweet: null
            };
        },
    
        componentDidMount: function(){
            SnapkiteStreamClient.initialzeStream(this.handleNewTweet);
        },
    
        componentWillUnmount: function(){
            SnapkiteStreamClient.destroyStream();
        },
    
        handleNewTweet: function(){
            this.setState({
                tweet: tweet
            });
        },
    
        render: function(){
            var tweet = this.state.tweet;
    
            if (tweet) {
                return (
                    <StreamTweet tweet={tweet} addTweetToCollection={this.props.onAddTweetToCollection} />
                );
            }
    
            return (
                <Header text="Waiting for public photos form Twitter..." />
            );
        }
    });
    
    module.exports = Stream;

* componentDidMount()

    生命周期方法,它仅仅被调用一次，在组件完成初始化之后执行。在这个时候，React 已经创建了 DOM 树，有我们的组件表示，此时可以使用其他 JavaScript 库来访问这个 DOM 树。

    componentDidMount() 最适合勇用来整合 React 和其他 Javascript 库。

* componentWillUnmount()

    生命周期方法,组件即将卸载之前被调用。

####React 组件的生命周期方法
所有 React 组件生命周期方法可以分为下面三个阶段：

* 挂载（Mounting）：这个阶段发生在组件被插入 DOM 时。
* 更新（Updating）：这个阶段发生在组件被重新渲染成虚拟 DOM 并决定实际 DOM 是否需要更新时。
* 卸载（Unmounting）：这个阶段发生在组件从 DOM 中被删除时。

用 React 的属于来说，把组件插入 DOM 叫挂载，相反在 DOM 中删除组件叫卸载。

1. __挂载方法__ ：

    - getInitialState()
        这个方法是第一个被调用的，它会在 React 将组件插入 DOM 之前被调用。

    - componentWillMount()
        这个方法是第二个被调用的，它会在 React 将组件即将插入 DOM 时被调用。

    - componentDidMount()
        这个方法是第三个被调用的，它会在 React 将组件插入到 DOM 之后立即被调用。更新后的 DOM 现在是可以被访问，这意味着这个方法是初始化其他需要访问这些 DOM 的 JavaScript 库最佳的地方。

    React 第一次渲染时，将按顺序执行以下方法:

    - getInitialState()
    - componentWillMount()
    - render()
    - componentDidMount()

    这些方法在 React 组件的 挂载阶段 被调用。它们仅执行一次，除非我们卸载组件并再次挂载它。

2. __更新方法__ ：
    - componentWillReceive()
        这个方法在更新阶段被第一个调用，具体来说，就是当组件从它的父组件接收到新属性时被调用。

        此方法让我们可以使用 ```this.props``` 对象和 nextProps 对象来比较当前组件和下一个组件的属性。根据比较结果，可以选怎使用 ```this.setState()``` 函数来更新组件的 state，在这种场景下将不会触发额外的渲染。

        不管在 ```componentWillReceive()``` 方法中调用 ```this.setState()``` 多少次，它都不会触发组件额外的渲染。React 做了内部优化，会把状态更新操作放在一起批量执行。

    - shouldComponentUpdate()
        这个方法在更新阶段被第二个调用，通过 ```shouldComponentUpdate()``` 方法，我们可以决定组件的下一个状态是否触发组件的重新渲染。这个方法返回一个布尔值，默认为 ```true```。如果为 ```false```，下面的组件方法都不会被调用：
        + componentWillUpdate()
        + render()
        + componentDidUpdate()

        如果跳过对组件的 ```render()``` 方法的调用，就会阻止该组件的重新渲染，这将提高应用程序的性能，因为没有额外的 DOM 改变。

    - componentWillUpdate()
        这个方法在 React 即将更新 DOM 之前被调用。它得到以下两个参数：
        + nextProps：下一个属性对象
        + nextState：下一个状态对象

        在调用 ```componentWillUpdate()``` 方法之后，React 调用 render() 方法来执行 DOM 更新。然后 ```componentDidUpdate()``` 方法被调用。

    - componentDidUpdate()
        这个方法在 React 更新 DOM 之后被 __立即__ 调用。它得到如下两个参数：
        + precProps：上一个属性对象
        + prevState：上一个状态对象

        我们将使用这个方法来操作更新后的 DOM 或者执行渲染后的操作。

3. __卸载方法__ ：

    - 在这个阶段 React 仅提供一个方法，那就是 ```componentWillUnmount()``` 。
        这个方法在 React 即将从 DOM 中删除并销毁组件之前被调用。

        对于清理组件在安装或者更新阶段创建的所有数据，这个方法是很有用的。

        如果你已经在 componentDidMount() 方法中创建了额外的 DOM 元素，那么 componentWillUnmount() 是删除他们最好的地方。

> 在整合 React 组件和其他 JavaScript API 时，可以将 componentDidMount() 和 componentWillUnmount() 方法想象成一个两步机制：

> 1. 在 componentDidMount() 方法中初始化它们。
> 2. 在 componentWillUnmount() 方法中结束它们。



####设置 React 组件的默认属性
组件可以使用 getDefaultProps() 方法设置一个默认值，如果父组件传递了 this.props.text 属性，那么默认值将会被覆盖。


####验证 React 组件的属性
在 React 中，使用组件的 propTypes 对象来验证组件的属性：

    propTypes: {
        propertyName: validator
    }

在这个对象中，你需要指定一个属性名和一个用来确定属性是否有效的验证器函数，

React 提供了一些预置的验证器供我们使用，他们都定义在 React.PropTypes 对象上，如下：

* React.PropTypes.number：验证属性是否为数字
* React.PropTypes.string：验证属性是否为字符串
* React.PropTypes.boll：验证属性是否为布尔值
* React.PropTypes.func：验证属性是否为函数
* React.PropTypes.object：验证属性是否为对象
* React.PropTypes.element：验证属性是否为 React 元素

默认情况下，使用 React.PropTypes 验证器验证的所有属性都是可选的。可以把任何一个属性设置为 isRequiredis ，来确保当没有传递该属性的时候会在 JavaScript 控制台显示一条警告信息：

    propTypes: {
        propertyName: React.PropTypes.number.isRequiredis
    }

也可以指定自定义验证函数，该函数需要在验证失败的时候返回一个 Error 对象：

    propTypes: {
        propertyName: function(properties, propertyName, componentName){
            // ... 验证失败
            return new Error('A property is not valid.');
        }
    }
* properties：组件的属性对象
* propertyName：我们将要验证的属性名
* componentName：组件的名字

<br />

------------------------
<br />

##构建复杂的 React 组件








