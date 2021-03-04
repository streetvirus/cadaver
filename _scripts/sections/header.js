import $ from 'jquery';
import BaseSection from './base';

export default class HeaderSection extends BaseSection {
  constructor(container) {
    super(container, 'header');

    console.log('header!!')
  }
}
