import { Classes, NonIdealState, Spinner } from '@blueprintjs/core';
import * as classNames from 'classnames';
import * as React from 'react';

interface IEnvVisualizerState {
  loading: boolean;
}

class EnvVisualizer extends React.Component<{}, IEnvVisualizerState> {
  private $parent: HTMLElement | null;

  constructor(props: any) {
    super(props);
    this.state = { loading: true };
  }

  public componentDidMount() {
    this.tryToLoad();
  }

  public render() {
    return (
      <div ref={r => (this.$parent = r)} className={classNames('sa-env-visualizer', Classes.DARK)}>
        {this.state.loading && (
          <NonIdealState description="Loading Env Visualizer..." icon={<Spinner />} />
        )}
      </div>
    );
  }

  private tryToLoad = () => {
    const element = (window as any).EnvVisualizer;
    if (this.$parent && element) {
      // Env Visualizer has been loaded into the DOM
      element.init(this.$parent);
      this.setState((state, props) => {
        return { loading: false };
      });
    } else {
      // Try again in 1 second
      window.setTimeout(this.tryToLoad, 1000);
    }
  };
}

export default EnvVisualizer;
