'use client'
import { createDomain } from 'effector'
import { AllowedLangs } from '@/constants/lang'

export const lang = createDomain()

export const setLang = lang.createEvent<AllowedLangs>()

export const $lang = lang
  .createStore(AllowedLangs.EN)
  .on(setLang, (_, lang) => lang)
