import * as React from 'react'
import { useState } from 'react'
import { AnimateSharedLayout, motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'

import SoundControl from './SoundControl'

import { audioOnState } from '../store/audio'

const links: Link[] = [
  { text: 'About', link: '/about' },
  { text: 'Tips & Tricks', link: '/tips-tricks' },
  { text: 'Courses', link: '/courses' },
  { text: 'Contact', link: '/contact' },
]

interface Link {
  text: string
  link: string
}

const Navbar = () => {
  const [index, setIndex] = useState<number | null>(null)
  const [isHover, setIsHover] = useState(false)

  const audioOn = useRecoilValue(audioOnState)

  const controls = useAnimation()

  let popSound: HTMLAudioElement
  let clickSound: HTMLAudioElement
  let homeSound: HTMLAudioElement

  if (typeof Audio !== 'undefined') {
    popSound = new Audio('/sounds/pop_drip.mp3')
    clickSound = new Audio('/sounds/click_snip.mp3')
    homeSound = new Audio('/sounds/click_natural.mp3')
  }

  React.useEffect(() => {
    if (isHover) {
      controls.start({
        y: [0, -20, 10, 0],
        rotate: [0, 360],
      })
    }
  }, [isHover])

  return (
    <Wrapper>
      <Link href="/">
        <a>
          <div
            style={{ position: 'relative' }}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          >
            <Logo
              src="/images/logo.svg"
              alt="Logo"
              onClick={() => homeSound.play()}
            />
            <LogoCode
              src="/images/logo-o.svg"
              alt="Logo code"
              animate={controls}
            />
          </div>
        </a>
      </Link>
      <Menu>
        <MenuList onMouseLeave={() => setIndex(null)}>
          <AnimateSharedLayout>
            {links.map(({ text, link }, i) => (
              <MenuListItem
                key={link}
                onMouseOver={() => {
                  setIndex(i)
                }}
                onClick={() => audioOn && popSound.play()}
              >
                <Link href={link}>
                  <StyledLink>
                    {text}
                    {index === i && (
                      <motion.div
                        layoutId="menuItem"
                        initial={{ y: 1 }}
                        animate={{ y: 0 }}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '0.3rem',
                          background: '#F6DEFF',
                          bottom: '-1.1rem',
                          borderRadius: '0.5rem',
                        }}
                      />
                    )}
                  </StyledLink>
                </Link>
              </MenuListItem>
            ))}
          </AnimateSharedLayout>
        </MenuList>
        <Controls>
          <Link href="/login">
            <a>
              <Button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => audioOn && clickSound.play()}
              >
                Login
              </Button>
            </a>
          </Link>
          <SoundControl />
        </Controls>
      </Menu>
    </Wrapper>
  )
}

export default React.memo(Navbar)

// Styles
const Wrapper = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 100;
    padding: 3rem 0rem;
    max-width: 140rem;
    pointer-events: none;
  }

  @media (min-width: 1024px) {
    padding: 4rem 0rem;
  }

  @media (min-width: 1700px) {
    padding: 3rem 0rem;
    max-width: 160rem;
  }
`

const Menu = styled.nav`
  display: flex;
  pointer-events: all;
`

const MenuList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  position: relative;
  padding: 1rem 0;
`

const MenuListItem = styled.li`
  font-size: 2rem;
  color: #f4d7ff;
  cursor: pointer;
  position: relative;

  &:not(:last-child, :nth-child(4)) {
    margin-right: 5rem;

    &::after {
      content: '';
      position: absolute;
      height: 110%;
      width: 2px;
      background: rgba(227, 154, 255, 0.2);
      right: -2.5rem;
      top: 0;
    }
  }
`

const StyledLink = styled.a`
  position: relative;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
`

const Button = styled(motion.button)`
  border: none;
  padding: 1rem 2.6rem;
  font-size: 2.2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  background: linear-gradient(95.66deg, #61dafb 30.07%, #bb6bd9 104.98%);
  color: #333;
  cursor: pointer;
  position: relative;
  z-index: 900;
  outline: none;
  margin-left: 4rem;

  @media (max-width: 330px) {
    font-size: 1.8rem;
  }

  @media (min-width: 768px) {
    font-size: 2.2rem;
  }

  @media (min-width: 1366px) {
    /* font-size: 2.4rem; */
  }
`

const Logo = styled.img`
  width: 33rem;
  pointer-events: all;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
`

const LogoCode = styled(motion.img)`
  position: absolute;
  left: 2.2rem;
  top: 1.6rem;

  @media (min-width: 1500px) {
    left: 2.3rem;
    top: 1.8rem;
  }
`
