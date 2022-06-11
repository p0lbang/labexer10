import React from 'react'

class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			games: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/find-all')
			.then(response => response.json())
			.then(body => {
				this.setState({ games: body })
			})
	}

	render() {

		return(
			<div>
				<h2>Welcome to the homepage!</h2>
				<ol>
					{
						this.state.games.map((game, i) => {
							return <li key={i}><a href={"/game?id=" + game._id}>{game.title}</a></li>
						})
					}
				</ol>
			</div>
			)
	}
}

export default Home