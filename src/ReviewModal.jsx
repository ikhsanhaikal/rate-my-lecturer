import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Tag,
  TagCloseButton,
  Select,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { Rating } from "react-simple-star-rating";

const GET_METADATA = gql`
  query GET_METADATA($lecturerId: Int!) {
    characters {
      id
      name
    }
    lecturer(id: $lecturerId) {
      courses {
        id
        subject {
          id
          name
        }
        year
        semester
      }
    }
  }
`;

const ReviewModal = ({
  isOpen,
  onClose,
  finalRef,
  addReview,
  result,
  lecturerId,
}) => {
  const { loading, error, data } = useQuery(GET_METADATA, {
    variables: {
      lecturerId: lecturerId,
    },
  });

  if (error) {
    console.log(`error: `, error);
  }
  if (loading) {
    return <>Beautifull loading ui..</>;
  }

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your review of the lecturer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormForReview data={data} addReview={addReview} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
const validate = (values) => {
  const errors = {};
  if (!values.comment || values.comment.length === 0) {
    errors.comment = "Required";
  }
  if (values.course.split(":").length < 2) {
    errors.course = "Required";
  }
  if (values.tags.length < 1) {
    errors.tags = "Required one tag";
  }
  if (values.rating === 0) {
    errors.rating = "Rate is required";
  }
  return errors;
};
function FormForReview({ data, addReview }) {
  return (
    <Formik
      initialValues={{ comment: "", course: "", tags: [], rating: 0 }}
      validate={validate}
      onSubmit={(values, actions) => {
        console.log("values: ", values);
        addReview({
          variables: {
            reviewInput: {
              comment: values.comment,
              course: parseInt(
                values.course.substring(values.course.indexOf(":") + 1)
              ),
              rating: values.rating,
              tags: values.tags.map((tag) =>
                parseInt(tag.substring(tag.indexOf(":") + 1))
              ),
            },
          },
        });

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <FormControl
            isInvalid={props.errors.comment && props.touched.comment}
          >
            <FormLabel>Comment</FormLabel>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.comment}
              name="comment"
              placeholder="it was fun all the times"
            />
            <FormErrorMessage>{props.errors.comment}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={props.errors.course && props.touched.course}>
            <FormLabel>Course</FormLabel>
            <Select
              name="course"
              onChange={(event) => {
                console.log("onChange: ", event.target.value);
                const courseId =
                  event.target.selectedOptions[0].getAttribute("data-key");
                props.handleChange("course")(
                  `${event.target.value}:${courseId}`
                );
              }}
              onBlur={props.handleBlur}
              value={props.values.course.split(":")[0]}
              placeholder="Kelas yang diambil"
            >
              <option>All</option>
              {data.lecturer.courses.map((c) => {
                return (
                  <option key={c.id} data-key={c.id}>
                    {c.subject.name}, {new Date(c.year).getFullYear()},{" "}
                    {c.semester}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>{props.errors.course}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={props.errors.tags && props.touched.tags}>
            <FormLabel>Tags</FormLabel>
            <Select
              name="tags"
              onChange={(event) => {
                if (props.values.tags.length === 4) {
                  return;
                }
                const courseId =
                  event.target.selectedOptions[0].getAttribute("data-key");
                props.setFieldValue(
                  "tags",
                  new Set([
                    ...props.values.tags,
                    `${event.target.value}:${courseId}`,
                  ])
                    .values()
                    .toArray()
                );
              }}
              onBlur={props.handleBlur}
              value={props.values.tags[props.values.tags.length]?.split(":")[0]}
              placeholder="Select option"
            >
              {data.characters.map((tag) => (
                <option key={tag.id} data-key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{props.errors.tags}</FormErrorMessage>
            {props.values.tags
              .values()
              .map((tag) => {
                return (
                  <Tag key={tag}>
                    {tag.split(":")[0]}
                    <TagCloseButton
                      onClick={() => {
                        props.setFieldValue(
                          "tags",
                          props.values.tags.filter((t) => t !== tag)
                        );
                      }}
                    />
                  </Tag>
                );
              })
              .toArray()}
          </FormControl>
          <FormControl isInvalid={props.errors.rating && props.touched.rating}>
            <FormLabel>Rating</FormLabel>
            <Rating
              onClick={(rate) => {
                props.setFieldValue("rating", rate);
              }}
              allowFraction={true}
              className="rating"
            />
            <FormErrorMessage>{props.errors.rating}</FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
