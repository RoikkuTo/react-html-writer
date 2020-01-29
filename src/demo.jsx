import React from 'react'
import { HTMLTag, String } from './HTMLTag'

const Demo = () => {
    return (
        <div>
            <HTMLTag tagName="div" attr={{ id: 'test', style: 'color: red' }} open loop>
                <HTMLTag tagName="h1">
                    <String text="Titre " />
                    <HTMLTag tagName="span" attr={{ style: 'color: magenta' }}>
                        <String text="1" style={{ color: 'purple' }} />
                    </HTMLTag>
                </HTMLTag>
                <HTMLTag tagName="p" open>
                    <String text="Ceci est un paragraphe." />
                </HTMLTag>
                <HTMLTag tagName="ul" open>
                    <HTMLTag tagName="li" attr={{ style: 'color: red' }}>
                        <String text="Rouge" style={{ color: 'red' }} />
                    </HTMLTag>
                    <HTMLTag tagName="li" attr={{ style: 'color: green' }}>
                        <String text="Vert" style={{ color: 'green' }} />
                    </HTMLTag>
                    <HTMLTag tagName="li" attr={{ style: 'color: blue' }}>
                        <String text="Bleu" style={{ color: 'blue' }} />
                    </HTMLTag>
                </HTMLTag>
            </HTMLTag>
            <HTMLTag tagName="p" open>
                <String text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti est autem rerum ducimus omnis quos eum similique tempora dolores, ipsam nesciunt illum adipisci molestiae distinctio facere. Placeat nulla quibusdam quia?" />
            </HTMLTag>
        </div>
    )
}

export default Demo