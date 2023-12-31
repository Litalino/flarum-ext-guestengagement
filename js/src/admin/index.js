/*
 * This file is part of justoverclock/flarum-ext-guestengagement.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import app from 'flarum/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';

app.initializers.add('litalino-guestengagement', () => {
  app.extensionData.for('litalino-guestengagement').registerSetting({
    setting: 'justoverclock-guestengagement.coordinates',
    name: 'afterXpost',
    type: 'number',
    label: app.translator.trans('flarum-ext-guestengagement.admin.afterxpost'),
    help: app.translator.trans('flarum-ext-guestengagement.admin.afterxpostdesc'),
  });
  app.extensionData.for('litalino-guestengagement').registerSetting({
    setting: 'justoverclock-guestengagement.timeout',
    name: 'timeout',
    type: 'number',
    label: app.translator.trans('flarum-ext-guestengagement.admin.autohide'),
    help: app.translator.trans('flarum-ext-guestengagement.admin.autohidedesc'),
  });
  app.extensionData.for('litalino-guestengagement').registerSetting({
    setting: 'justoverclock-guestengagement.textchange',
    name: 'tchange',
    type: 'text',
    label: app.translator.trans('flarum-ext-guestengagement.admin.changetextbox'),
    help: app.translator.trans('flarum-ext-guestengagement.admin.changetextboxdesc'),
    placeholder: 'When you create an account...',
  });
  app.extensionData.for('litalino-guestengagement').registerSetting({
    setting: 'justoverclock-guestengagement.BoxTitleChange',
    name: 'BoxTitle',
    type: 'text',
    label: app.translator.trans('flarum-ext-guestengagement.admin.maintitle'),
    help: app.translator.trans('flarum-ext-guestengagement.admin.maintitledesc'),
    placeholder: 'Hello! You seem to be interested in this post!',
  });
  app.extensionData.for('litalino-guestengagement').registerSetting({
    setting: 'justoverclock-guestengagement.hide.homebox',
    label: app.translator.trans('flarum-ext-guestengagement.admin.enablealbox'),
    type: 'boolean',
  });
  app.extensionData.for('litalino-guestengagement').registerSetting({
    setting: 'justoverclock-guestengagement.hide.postbox',
    label: app.translator.trans('flarum-ext-guestengagement.admin.enablepostbox'),
    type: 'boolean',
  });
  app.extensionData.for('litalino-guestengagement').registerSetting({
    setting: 'justoverclock-guestengagement.hide.homebox.buttom',
    label: app.translator.trans('flarum-ext-guestengagement.admin.enable_buttom_homepage'),
    type: 'boolean',
  });
  app.extensionData.for('litalino-guestengagement').registerSetting({
    setting: 'justoverclock-guestengagement.hide.post.buttom',
    label: app.translator.trans('flarum-ext-guestengagement.admin.enable_buttom_post'),
    type: 'boolean',
  });
});
