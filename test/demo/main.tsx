import React from 'react'
import { createRoot } from 'react-dom/client'
import { Tag, Text } from '@lib/index'
// import { Tag, Text, HTMLWriter } from '../../dist/react-html-writer.es'

import './style.css'

const Demo = () => (
	<>
		<Text text="React HTML Writer" />

		<Tag name="div" attr={{ id: 'test', style: 'color: red' }} theme={{ fontFamily: '"Source Code Pro", monospace' }} open loop>
			<Tag name="h1">
				<Text text="Titre " />
				<Tag name="span" attr={{ style: 'color: magenta' }}>
					<Text text="1" style={{ color: 'purple' }} />
				</Tag>
			</Tag>
			<Tag name="p" open>
				<Text text="Ceci est un paragraphe." />
			</Tag>
			<Tag name="ul" open>
				<Tag name="li" attr={{ style: 'color: red' }}>
					<Text text="Rouge" style={{ color: 'red' }} />
				</Tag>
				<Tag name="li" attr={{ style: 'color: green' }}>
					<Text text="Vert" style={{ color: 'green' }} />
				</Tag>
				<Tag name="li" attr={{ style: 'color: blue' }}>
					<Text text="Bleu" style={{ color: 'blue' }} />
				</Tag>
			</Tag>
		</Tag>

		<Tag name="p" theme={{ fontFamily: 'Times', tagHookColor: 'yellow', tagNameColor: 'cyan', textColor: 'magenta' }} open>
			<Text text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est autem rerum ducimus omnis quos eum similique tempora dolores, ipsam nesciunt illum adipisci molestiae distinctio facere. Placeat nulla quibusdam quia?" />
		</Tag>
	</>
)

const root = createRoot(document.getElementById('app')!)

root.render(
	<React.StrictMode>
		<Demo />
	</React.StrictMode>
)
