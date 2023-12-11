/*
 * This file is part of justoverclock/flarum-ext-guestengagement.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import app from 'flarum/forum/app';

import { extend, override } from 'flarum/common/extend';

import IndexPage from 'flarum/forum/components/IndexPage';
import PostStream from 'flarum/forum/components/PostStream';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import LogInModal from "flarum/forum/components/LogInModal";
import Button from 'flarum/common/components/Button';

app.initializers.add('litalino/flarum-ext-guestengagement', () => {
  extend(IndexPage.prototype, 'view', function (vdom) {
    if (!app.session.user)
      if (app.forum.attribute('litalino-guestengagement.hideHomeBox') === true)
        if (vdom.children && vdom.children.splice) {
          /*  Imposta un timeout per far scomparire automaticamente il div*/
          setTimeout(function () {
            $('#wrapperengage').fadeOut().empty();
          }, app.forum.attribute('litalino-guestengagement.timeOut'));

          const insert = m(
            'div',
            { id: 'wrapperengage' },
            m('div', { id: 'engagebox' }, [
              m('p', [
                m('strong', app.translator.trans('flarum-ext-guestengagement.forum.hello')),
                m('p'),
                app.translator.trans('flarum-ext-guestengagement.forum.whenucreate'),
                app.translator.trans('flarum-ext-guestengagement.forum.uwillreceive'),
              ]),
               //app.forum.attribute('litalino-guestengagement.hidePostButtom') === true ? '' : buttom_tag_home
              //if (app.forum.attribute('litalino-guestengagement.hideHomeboxButtom') === true)
                /*m(
                  'button',
                  { className: '.SplitDropdown-button Button Button--primary hasIcon', type: 'button', onclick: () => app.modal.show(SignUpModal) },
                  app.translator.trans('core.forum.header.sign_up_link')
                ),
                m(
                  'i',
                  app.translator.trans('flarum-ext-guestengagement.forum.or')
                ),
                m(
                  'button',
                  { className: '.SplitDropdown-button Button Button--primary hasIcon', type: 'button', onclick: () => app.modal.show(LogInModal) },
                  app.translator.trans('core.forum.header.log_in_link')
                ),*/
              //}
            ])
          );
          vdom.children.splice(1, 0, insert);
        }
  });

  override(PostStream.prototype, 'view', function (originalView) {
    // If we're logged in or this feature is disabled, change nothing
    // about the PostStream
    if (app.session.user || app.forum.attribute('litalino-guestengagement.hidePostBox') !== true) {
      return originalView();
    }

    /**
     * Array of items inside the PostStream.
     *
     * @type {import('mithril').Children[]}
     */
    const postStreamItems = originalView().children;
    const buttom_tag = (
      <>
      <Button class="Button Button--inverted" onclick={() => app.modal.show(SignUpModal)}>
      {app.translator.trans('flarum-ext-guestengagement.forum.signupbtn')}
      </Button>
      {app.translator.trans('flarum-ext-guestengagement.forum.or')}
      <Button class="Button Button--inverted" onclick={() => app.modal.show(LogInModal)}>
        {app.translator.trans('flarum-ext-guestengagement.forum.loginbtn')}
      </Button>
      </>
    );

    const tchange = app.forum.attribute('litalino-guestengagement.tchange') ? '<p>'+ app.forum.attribute('litalino-guestengagement.tchange') +'</p>' : ''; 
    const BoxTitle = app.forum.attribute('litalino-guestengagement.BoxTitle') ? app.forum.attribute('litalino-guestengagement.BoxTitle') : app.translator.trans('flarum-ext-guestengagement.forum.post_title');

    const engagementBox = (
      <div key="litalino-guestengagement" id="wrapperengageps">
        <div id="engageboxps">
          {tchange}
          <i class="fas fa-comments-alt"></i> <strong>{BoxTitle}</strong>
         { app.forum.attribute('litalino-guestengagement.hidePostButtom') === true ? buttom_tag : '' }
        </div>
      </div>
    );

    const newItems = postStreamItems.reduce((items, currentItem) => {
      let itemList = [...items, currentItem];

      if (currentItem.attrs['data-index'] === (parseInt(app.forum.attribute('litalino-guestengagement.xPost')) || 0)) {
        itemList.push(engagementBox);
      }

      return itemList;
    }, []);

    return <div className="PostStream">{newItems}</div>;
  });
});
