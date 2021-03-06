import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner';
import Tally from './Tally';

export default React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		const { pair, tally, winner } = this.props;
		// return this.props.winner ? 
		// <Winner ref="winner" winner={this.props.winner} /> :	
		return winner ? 
		<Winner ref="winner" winner={winner} /> :
		<div className="results">
			<Tally {...this.props} />
			<div className="management">
				<button ref="next"
								className="next"
								onClick={this.props.next}>
					Next
				</button>
			</div>
		</div>;		
	}
});