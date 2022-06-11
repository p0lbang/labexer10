import React from 'react'
const queryString = require('query-string')

class Game extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			id: queryString.parse(props.location.search).id,
			title: '',
			developer: '',
			year: '',
			online: '',
			maxLocalPlayers: ''
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/find-by-id-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: this.state.id })
		})
			.then(response => response.json())
			.then(body => {
				this.setState({
					title: body.title,
					developer: body.developer,
					year: body.year,
					online: body.online,
					maxLocalPlayers: body.maxLocalPlayers
				})
			})
	}

	render() {
		return (
			<div>
				<h1>{ this.state.title }</h1>
				Developer: { this.state.developer } <br/>
				Year: { this.state.year } <br/>
				Online: { this.state.online ? "True" : "False" } <br/>
				Max Local Players: { this.state.maxLocalPlayers }
			</div>
			)
	}
}

export default Game