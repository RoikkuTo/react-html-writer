// @ts-nocheck
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Tag from './tag.jsx'

import './style.scss'

const Cursor = ({ display }) => display && <span className="cursor">&#8205;</span>

export class String extends Component {
    constructor(props) {
        super(props)
        this.state = {
            string: '',
            cursor: false
        }
    }

    write() {
        var str = this.props.string
        var i = 0

        const foo = () => {
            const char = str[i]
            if (i < str.length) {
                this.setState(state => ({
                    string: state.string + char
                }))
                i++
                setTimeout(foo, Tgen.calc.rand(95, 175))
            } else if (this.props.endOfLine) {
                setTimeout(() => {
                    this.props.endOfLine()
                    this.setState({ cursor: false })
                }, Tgen.calc.rand(500, 600))
            }
        }

        this.setState({ cursor: true })
        setTimeout(foo, Tgen.calc.rand(500, 600))
    }

    render() {
        return (
            <div>
                <pre>{this.state.string}</pre>
                <Cursor display={this.state.cursor} />
            </div>
        )
    }

    componentDidMount() {
        if (!this.props.queue) this.write()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.index === nextProps.queue) this.write()
    }
}

export class HTMLTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queue: -1,
            htmlTagOrder: 0,
            open: false,
            cursor: false,
            select: false,
            delete: false
        }
        this.content = this.props.content.map((elm, i) => React.cloneElement(elm, {
            key: Tgen.generate.keyDate(),
            index: i,
            endOfLine: this.nextTag.bind(this)
        }))
    }

    loop() {
        this.setState({
            cursor: true,
            select: true,
        })
        setTimeout(() => {
            this.setState({
                openTag: '',
                closeTag: '',
                queue: -1,
                htmlTagOrder: 0,
                open: false,
                select: false,
                delete: true
            }, () => setTimeout(() => {
                this.setState({ delete: false }, () => this.write())
            }, 1000))
        }, 750)
    }

    nextTag() {
        const LEN = this.props.content.length - 1
        this.setState(state => ({
            queue: state.queue < LEN ? state.queue + 1 : null
        }), () => {
            if (this.state.queue === null) {
                if (this.props.endOfLine) {
                    this.props.endOfLine()
                } else this.loop()
            }
        })
    }

    write() {
        switch (this.state.htmlTagOrder) {
            case 0: {
                var tag = ['<', this.props.tagName, this.props.attr ? (() => {
                    var array = []
                    for (const [key, val] of Object.entries(this.props.attr)) array.push({ reactKey: Tgen.generate.keyDate(), data: [` ${key}`, '=', `"${val}"`] })
                    return array
                })() : '', '>']

                this.setState({ cursor: true })
                setTimeout(() => this.setState(state => ({
                    'openTag': tag,
                    htmlTagOrder: state.htmlTagOrder + 1
                })), Tgen.calc.rand(500, 600))
                break
            }

            case 1: {
                var tag = ['</', this.props.tagName, '', '>']
                this.setState(state => ({
                    'closeTag': tag,
                    htmlTagOrder: state.htmlTagOrder + 1
                }))
                break
            }

            default:
                setTimeout(() => {
                    this.setState(state => ({
                        open: this.props.multiline,
                        cursor: false
                    }))
                    this.nextTag()
                }, Tgen.calc.rand(500, 600))
                break
        }
    }

    render() {
        return this.state.delete ? <Cursor display={true} /> : (
            <div className={"HTML-tag" + (this.state.open ? ' open' : ' close') + (this.state.select ? ' select' : '')}>
                <Tag name={this.props.tagName} attr={this.props.attr} openTag />
            </div>
        )
    }

    componentDidMount() {
        if (!this.props.queue) this.write()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.index === nextProps.queue) this.write()
    }
}

/*
<div className="content" style={{ display: this.props.inline ? 'flex' : 'block', marginLeft: this.state.open ? '1em' : '' }}>
    {this.content.map(elm => React.cloneElement(elm, { queue: this.state.queue }))}
</div>
<Tag cssClass="close-tag" content={this.state.closeTag} endOfLine={this.write.bind(this)} />
<Cursor display={this.state.cursor} />
*/