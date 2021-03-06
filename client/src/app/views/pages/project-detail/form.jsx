import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { Toggle, TextBox, TextArea } from 'views/common/form'
import CustomHeader from './custom-header'
import { validateRequired } from 'views/common/validate'

const ProjectForm = ({ showDeleteProjectDialog, handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Project Name"
        type="text"
        name="name"
        placeholder="Project Name"
        disabled={ !idle }
        validate={ validateRequired }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Slug"
        type="text"
        name="slug"
        readOnly
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Pretty Origin"
        type="text"
        name="prettyOrigin"
        placeholder="https://yourproject.com/assets"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <TextArea
        label="Allowed Origins"
        type="text"
        name="origins"
        placeholder="*.yourproject.com"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <Toggle
        label="Project Status"
        checkedText="Disabled"
        uncheckedText="Enabled"
        name="disabled"
        disabled={ !idle }
      />
    </Form.Line>

    <CustomHeader />

    <Form.Line last>
      <Button.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={ !idle }
        >Save</Button>
        <Button
          variant="secondary"
          disabled={ !idle }
          onClick={ showDeleteProjectDialog }
        >Delete</Button>
      </Button.Group>
    </Form.Line>
  </Form>
)

export default ProjectForm
