'use client'
import { createDomain } from 'effector'

export const modals = createDomain()

export const openSearchModal = modals.createEvent()
export const closeSearchModal = modals.createEvent()
export const openMinicart = modals.createEvent()
export const closeMinicart = modals.createEvent()
export const openAuthModal = modals.createEvent()
export const closeAuthModal = modals.createEvent()
export const openShareModal = modals.createEvent()
export const closeShareModal = modals.createEvent()

export const $searchModal = modals
  .createStore(false)
  .on(openSearchModal, () => true)
  .on(closeSearchModal, () => false)

export const $authhModal = modals
  .createStore(false)
  .on(openAuthModal, () => true)
  .on(closeAuthModal, () => false)

export const $minicart = modals
  .createStore(false)
  .on(openMinicart, () => true)
  .on(closeMinicart, () => false)

export const $shareModal = modals
  .createStore(false)
  .on(openShareModal, () => true)
  .on(closeShareModal, () => false)
