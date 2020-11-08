'use strict';

const React = require('react');

class Search extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      DynamicTextComp: null,
    };

    this.loadComponent.bind(this);
  }

  loadComponent() {
    console.log('loadComponent');
    import('./components/dynamic-text-comp/index').then((DynamicTextComp) => {
      this.setState({
        DynamicTextComp: DynamicTextComp.default,
      });
    });
  }

  render() {
    const { DynamicTextComp } = this.state;
    return (
      <div className="search-text">
        {DynamicTextComp ? <DynamicTextComp>动态文本</DynamicTextComp> : null}
        <div onClick={ this.loadComponent.bind(this) }>点击加载动态文本123</div>
      </div>
    );
  }
}

module.exports = <Search />;
