import React from 'react'
import ReactDOM from 'react-dom'
import { Tag, String } from '../components/Tag' // ../../build/index

import './demo.css'

const Demo = () => (
	<>
		<Tag tagName="div" attr={{ id: 'test', style: 'color: red' }} open loop>
			<Tag tagName="h1">
				<String text="Titre " />
				<Tag tagName="span" attr={{ style: 'color: magenta' }}>
					<String text="1" style={{ color: 'purple' }} />
				</Tag>
			</Tag>
			<Tag tagName="p" open>
				<String text="Ceci est un paragraphe." />
			</Tag>
			<Tag tagName="ul" open>
				<Tag tagName="li" attr={{ style: 'color: red' }}>
					<String text="Rouge" style={{ color: 'red' }} />
				</Tag>
				<Tag tagName="li" attr={{ style: 'color: green' }}>
					<String text="Vert" style={{ color: 'green' }} />
				</Tag>
				<Tag tagName="li" attr={{ style: 'color: blue' }}>
					<String text="Bleu" style={{ color: 'blue' }} />
				</Tag>
			</Tag>
		</Tag>

		<Tag tagName="p" open>
			<String text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est autem rerum ducimus omnis quos eum similique tempora dolores, ipsam nesciunt illum adipisci molestiae distinctio facere. Placeat nulla quibusdam quia?" />
		</Tag>
	</>
)

ReactDOM.render(<Demo />, document.getElementById('root'))
